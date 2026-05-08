import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const RemoveObjects = () => {
  const [file, setFile] = useState(null);
  const [objectdesc, setObjectdesc] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRemoveObject = async () => {
    if (!file) return;
    setLoading(true);
    setResult('');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('objectdesc', objectdesc);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_EXPRESS_API_URL}/ai/remove-object`, {
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
              Object Removal
          </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 @[600px]/card:grid-cols-12">
              <div className="@[600px]/card:col-span-6">
                <Label htmlFor="upload">Upload Photo</Label>
                <Input 
                  id="upload" 
                  type="file" 
                  accept="image/*" 
                  className="cursor-pointer" 
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="@[600px]/card:col-span-6">
                <Label htmlFor="objectdesc">Describe object to remove</Label>
                <Textarea 
                  id="objectdesc" 
                  placeholder="e.g. Remove the red car in the background" 
                  value={objectdesc}
                  onChange={(e) => setObjectdesc(e.target.value)}
                />
              </div>
              <div className="flex justify-end @[600px]/card:col-span-12">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="cursor-pointer"
                  onClick={handleRemoveObject}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Remove Object'}
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
          <CardContent className="min-h-60">
            <div className="flex flex-col gap-4">
              <div className="min-h-60 rounded-md border border-input bg-background/50 flex items-center justify-center p-6 text-sm text-muted-foreground overflow-hidden">
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
              {result && !result.startsWith('Error') && (
                <Button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = result;
                    link.download = `removed-object-${Date.now()}.png`;
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

export default RemoveObjects