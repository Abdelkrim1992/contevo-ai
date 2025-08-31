import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const BlogTitles = () => {
  const outputRef = React.useRef(null)
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    const text = outputRef.current?.value || ''
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (e) {
      // ignore copy errors for UI-only behavior
    }
  }

  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 pt-6">
        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              AI Article Titles
          </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 @[600px]/card:grid-cols-12">
              <div className="@[600px]/card:col-span-8">
                <Label htmlFor="keyword">Keyword</Label>
                <Input id="keyword" placeholder="e.g. AI in healthcare" />
              </div>
              <div className="@[600px]/card:col-span-4">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="technology">
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="health">Health</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end @[600px]/card:col-span-12">
                <Button type="button" variant="outline" className="cursor-pointer">Generate Titles</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              Generated Titles
          </h1>
          </CardHeader>
          <CardContent>
            <Textarea className="min-h-33"
              ref={outputRef}
              placeholder="Your generated titles will appear here (one per line)."
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="button" variant="outline" className="cursor-pointer" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default BlogTitles