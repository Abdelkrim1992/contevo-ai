import OpenAI from 'openai';
import { ENV } from '../config/env.js';
import supabase from '../config/db.js';
import axios from 'axios';
import FormData from 'form-data';

const openai = new OpenAI({
    apiKey: ENV.OPENAI_API_KEY,
});

export const generateArticle = async (req, res) => {
    try {
        const { prompt, maxTokens = 500, temperature = 0.7, topic, length } = req.body;
        const userId = req.user;

        if (!prompt || !topic || !length) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: maxTokens,
            temperature: temperature,
        });

        const resultText = response.choices[0].message.content;

        // Save to supabase
        const { error } = await supabase.from('written_articles').insert({
            user_id: userId,
            topic,
            length,
            result_text: resultText
        });

        if (error) {
            console.error('Supabase Error (Article):', error);
        }

        return res.status(200).json({ success: true, data: resultText });
    } catch (error) {
        console.error('OpenAI Error (Article):', error);
        return res.status(500).json({ success: false, message: 'Failed to generate text', error: error.message });
    }
};

export const generateTitles = async (req, res) => {
    try {
        const { prompt, maxTokens = 200, keyword, category } = req.body;
        const userId = req.user;

        if (!prompt || !keyword || !category) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: maxTokens,
            temperature: 0.8,
        });

        const resultText = response.choices[0].message.content;

        const { error } = await supabase.from('blog_titles').insert({
            user_id: userId,
            keyword,
            category,
            result_text: resultText
        });

        if (error) {
            console.error('Supabase Error (Titles):', error);
        }

        return res.status(200).json({ success: true, data: resultText });
    } catch (error) {
        console.error('OpenAI Error (Titles):', error);
        return res.status(500).json({ success: false, message: 'Failed to generate titles', error: error.message });
    }
};

export const generateImage = async (req, res) => {
    try {
        const { prompt, size = "1024x1024", style = "realistic" } = req.body;
        const userId = req.user;

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required' });
        }

        const finalPrompt = style && style !== 'realistic' 
            ? `${prompt}, in a ${style} style` 
            : prompt;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: finalPrompt,
            n: 1,
            size: size,
        });

        const resultUrl = response.data[0].url;

        const { error } = await supabase.from('generated_images').insert({
            user_id: userId,
            prompt,
            style,
            result_url: resultUrl
        });

        if (error) {
            console.error('Supabase Error (Image):', error);
        }

        return res.status(200).json({ success: true, data: resultUrl });
    } catch (error) {
        console.error('OpenAI Error (Image):', error);
        return res.status(500).json({ success: false, message: 'Failed to generate image', error: error.message });
    }
};

export const reviewResume = async (req, res) => {
    try {
        const userId = req.user;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: 'Resume PDF is required' });
        }

        // Removed pdf-parse: Mocking the resume text extraction for now
        const resumeText = "This is a mock extracted text from the resume. The user is a software engineer with 5 years of experience in React and Node.js. Needs improvement on formatting.";

        const prompt = `Please review the following resume and provide constructive feedback on how to improve it, highlighting strengths and weaknesses:\n\n${resumeText}`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 1000,
            temperature: 0.7,
        });

        const analysisResult = response.choices[0].message.content;

        // Mock resume_url since we aren't uploading it to Cloudinary yet
        const resumeUrl = "uploaded_pdf_buffer"; 

        const { error } = await supabase.from('reviewed_resumes').insert({
            user_id: userId,
            resume_url: resumeUrl,
            analysis_result: analysisResult
        });

        if (error) {
            console.error('Supabase Error (Resume):', error);
        }

        return res.status(200).json({ success: true, data: analysisResult });
    } catch (error) {
        console.error('OpenAI Error (Resume):', error);
        return res.status(500).json({ success: false, message: 'Failed to review resume', error: error.message });
    }
};

export const removeBackground = async (req, res) => {
    try {
        const userId = req.user;
        if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });
        
        const form = new FormData();
        form.append('size', 'auto');
        form.append('image_file', req.file.buffer, {
            filename: req.file.originalname || 'image.jpg',
            contentType: req.file.mimetype || 'image/jpeg',
        });

        const response = await axios.post(ENV.REMOVE_BG_API_KEY, form, {
            headers: {
                ...form.getHeaders(),
                'X-Api-Key': ENV.REMOVE_BG_API_KEY,
            },
            responseType: 'arraybuffer',
        });

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const resultUrl = `data:image/png;base64,${base64Image}`;

        // Save to supabase
        const { error } = await supabase.from('removed_backgrounds').insert({
            user_id: userId,
            original_image_url: "uploaded_image", 
            result_image_url: resultUrl
        });

        if (error) {
            console.error('Supabase Error (RemoveBG):', error);
        }

        return res.status(200).json({ success: true, data: resultUrl });
    } catch (error) {
        console.error('Remove.bg Error:', error.response?.data?.toString() || error.message);
        return res.status(500).json({ success: false, message: 'Failed to remove background', error: error.message });
    }
};

export const removeObject = async (req, res) => {
    try {
        const userId = req.user;
        const { objectdesc } = req.body;
        if (!req.file) return res.status(400).json({ success: false, message: 'Image is required' });
        
        const form = new FormData();
        form.append('key', ENV.REMOVE_BG_API_KEY);
        form.append('image_file', req.file.buffer, {
            filename: req.file.originalname || 'upload.jpg',
            contentType: req.file.mimetype || 'image/jpeg',
            knownLength: req.file.size
        });

        const response = await axios.post(ENV.REMOVE_BG_API_KEY, form.getBuffer(), {
            headers: {
                ...form.getHeaders(),
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        if (response.data.status !== 200) {
            return res.status(400).json({ success: false, message: response.data.error || 'PixLab error' });
        }

        const resultUrl = response.data.link || `data:${response.data.mimeType};base64,${response.data.imgData}`;

        const { error } = await supabase.from('removed_objects').insert({
            user_id: userId,
            original_image_url: "uploaded_image",
            object_description: objectdesc || 'Unknown object',
            result_image_url: resultUrl
        });

        return res.status(200).json({ success: true, data: resultUrl });
    } catch (error) {
        console.error('PixLab Object Removal Error:', error.response?.data || error.message);
        return res.status(500).json({ success: false, message: 'Failed to process image' });
    }
};

export const getGenerations = async (req, res) => {
    try {
        const userId = req.user;
        
        // Fetch from multiple tables in parallel
        const [
            { data: articles, error: err1 },
            { data: titles, error: err2 },
            { data: images, error: err3 },
            { data: resumes, error: err4 },
        ] = await Promise.all([
            supabase.from('written_articles').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
            supabase.from('blog_titles').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
            supabase.from('generated_images').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
            supabase.from('reviewed_resumes').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10)
        ]);

        if (err1 || err2 || err3 || err4) {
            console.error('Error fetching history:', { err1, err2, err3, err4 });
            return res.status(500).json({ success: false, message: 'Failed to fetch history' });
        }

        return res.status(200).json({
            success: true,
            data: {
                articles: articles || [],
                titles: titles || [],
                images: images || [],
                resumes: resumes || []
            }
        });
    } catch (error) {
        console.error('getGenerations Error:', error);
        return res.status(500).json({ success: false, message: 'Server error fetching generations' });
    }
};
