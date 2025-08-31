import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const ReviewResume = () => {
  return (
    <>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 pt-6">
        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              Review Resume
          </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 @[600px]/card:grid-cols-12">
              <div className="@[600px]/card:col-span-8">
                <Label htmlFor="upload">Upload Resume (PDF)</Label>
                <Input id="upload" type="file" accept="application/pdf" className="cursor-pointer" />
                <p className="text-sm text-muted-foreground mt-2">Supports PDF resume only.</p>
              </div>
              <div className="flex justify-end @[600px]/card:col-span-12">
                <Button type="button" variant="outline" className="cursor-pointer">Review Resume</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              Analysis Results
          </h1>
          </CardHeader>
          <CardContent className="min-h-37">
            <Textarea className="min-h-37" placeholder="Your analysis results will appear here." />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ReviewResume