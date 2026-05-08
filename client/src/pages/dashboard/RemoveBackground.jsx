import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRemoveBg = async () => {
    if (!file) return;
    setLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_EXPRESS_API_URL}/ai/remove-background`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setResult('Error: ' + data.message);
      }
    } catch (err) {
      setResult('Error processing image.');
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
              Remove Background
          </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 @[600px]/card:grid-cols-12">
              <div className="@[600px]/card:col-span-8">
                <Label htmlFor="upload">Upload Image</Label>
                <Input 
                  id="upload" 
                  type="file" 
                  accept="image/*" 
                  className="cursor-pointer" 
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <p className="text-sm text-muted-foreground mt-2">Supports JPG, PNG, and other image formats.</p>
              </div>
              <div className="flex justify-end @[600px]/card:col-span-12">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={handleRemoveBg}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Remove Background'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              Processed Image
          </h1>
          </CardHeader>
          <CardContent className="min-h-37">
            <div className="min-h-37 rounded-md border border-input bg-background/50 flex items-center justify-center p-6 text-sm text-muted-foreground overflow-hidden">
              {result ? (
                result.startsWith('Error') ? (
                  <p className="text-red-500">{result}</p>
                ) : (
                  <img src={result} alt="Generated" className="object-contain h-full w-full rounded-md" />
                )
              ) : (
                "Your processed image will appear here."
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default RemoveBackground