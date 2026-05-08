import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const GenerateImages = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_EXPRESS_API_URL}/ai/generate-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ prompt, style }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setResult('Error: ' + data.message);
      }
    } catch (err) {
      setResult('Error generating image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 pt-6">
        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              AI Image Generator
          </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 @[600px]/card:grid-cols-12">
              <div className="@[600px]/card:col-span-8">
                <Label htmlFor="prompt">Describe your image</Label>
                <Textarea 
                  id="prompt" 
                  placeholder="e.g. A futuristic cityscape at dusk, neon lights, rain" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="@[600px]/card:col-span-4">
                <Label htmlFor="style">Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger id="style" className="w-full">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="photorealistic">Photorealistic</SelectItem>
                    <SelectItem value="3d">3D Render</SelectItem>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="cartoon">Cartoon</SelectItem>
                    <SelectItem value="watercolor">Watercolor</SelectItem>
                    <SelectItem value="oil">Oil Painting</SelectItem>
                    <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end @[600px]/card:col-span-12">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="cursor-pointer" 
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Image'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="@container/card self-start">
          <CardHeader>
            <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              Generated Image
            </h1>
          </CardHeader>
          <CardContent className="min-h-59">
            <div className="flex flex-col gap-4">
              <div className="min-h-59 rounded-md border border-input bg-background/50 flex items-center justify-center p-6 text-sm text-muted-foreground overflow-hidden">
                {result ? (
                  result.startsWith('Error') ? (
                    <p className="text-red-500">{result}</p>
                  ) : (
                    <img src={result} alt="Generated" className="object-contain h-full w-full rounded-md" />
                  )
                ) : (
                  "Your generated image will appear here."
                )}
              </div>
              {result && !result.startsWith('Error') && (
                <Button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = result;
                    link.download = `generated-image-${Date.now()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  variant="secondary"
                  className="w-full"
                >
                  Download Image
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default GenerateImages