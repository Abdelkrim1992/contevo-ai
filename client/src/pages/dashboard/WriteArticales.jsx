import { Card, CardHeader, CardContent } from '@/components/ui/card'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const WriteArticales = () => {
  return (
    <>
      <div
        className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2 pt-6">
        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              AI Article Writer
          </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 @[600px]/card:grid-cols-12">
              <div className="@[600px]/card:col-span-8">
                <Label htmlFor="topic">Article Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g. Modern Web Performance"
                />
              </div>
              <div className="@[600px]/card:col-span-4">
                <Label htmlFor="length">Article Length</Label>
                <Select defaultValue="short">
                  <SelectTrigger id="length" className="w-full">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (≈3 paragraphs)</SelectItem>
                    <SelectItem value="long">Long (≈7 paragraphs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button type="button" variant="outline" className="cursor-pointer">Generate Article</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="@container/card self-start">
          <CardHeader>
          <h1 className="text-2xl tabular-nums @[250px]/card:text-3xl">
              Generated Article
          </h1>
          </CardHeader>
          <CardContent>
            <Textarea className="min-h-49"
              placeholder="Your generated article will appear here."
            />
          </CardContent>
        </Card>

      </div>
    </>
  )
}

export default WriteArticales