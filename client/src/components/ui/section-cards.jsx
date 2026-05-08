import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "./button";

export function SectionCards() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [generations, setGenerations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerations() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_EXPRESS_API_URL}/ai/generations`, {
          credentials: "include"
        });
        const json = await res.json();
        if (json.success && json.data) {
          const { articles, titles, images, resumes } = json.data;
          
          let combined = [
            ...articles.map(a => ({ ...a, type: 'Article', title: a.topic, preview: a.result_text?.substring(0, 100) + '...', fullText: a.result_text })),
            ...titles.map(t => ({ ...t, type: 'Blog Titles', title: t.keyword, preview: t.result_text?.substring(0, 100) + '...', fullText: t.result_text })),
            ...images.map(i => ({ ...i, type: 'Image', title: i.prompt, imageUrl: i.result_url })),
            ...resumes.map(r => ({ ...r, type: 'Resume Review', title: 'Resume Review', preview: r.analysis_result?.substring(0, 100) + '...', fullText: r.analysis_result }))
          ];
          
          setTotal(combined.length);
          combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setGenerations(combined.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to fetch generations", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGenerations();
  }, []);

  return (
    <>
      <div
        className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Creations</CardDescription>
          <CardTitle className="text-2xl tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : total}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Plan</CardDescription>
          <CardTitle className="text-2xl tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : total > 10 ? "Premium" : "Free"}
          </CardTitle>
        </CardHeader>
      </Card>
      </div>

      <div className="px-4 lg:px-6 mt-4">
        <div className="flex items-center justify-between py-3">
          <div className="text-lg font-semibold flex-1 rounded-xl md:min-h-min">
            Recent Creations
          </div>
          <Link to="/dashboard/generations">
            <Button variant="outline" className="cursor-pointer">See all generation content</Button>
          </Link>
        </div>
        
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
          {loading ? (
              <p className="px-2 text-sm text-muted-foreground col-span-full">Loading recent creations...</p>
          ) : generations.length === 0 ? (
              <p className="px-2 text-sm text-muted-foreground col-span-full">No recent creations found.</p>
          ) : (
              generations.map((gen, idx) => (
                  <Card 
                      key={idx} 
                      className="@container/card flex flex-col h-full cursor-pointer hover:ring-2 ring-primary/20 transition-all"
                      onClick={() => setSelectedItem(gen)}
                  >
                      <CardHeader className="flex-1 pb-4">
                          <h2 className="text-md font-semibold truncate">
                              {gen.title}
                          </h2>
                          <div className="flex flex-col gap-2 mt-2">
                              {gen.type === 'Image' ? (
                                  <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted">
                                      <img src={gen.imageUrl} alt={gen.title} className="object-cover w-full h-full" />
                                  </div>
                              ) : (
                                  <p className="text-sm text-muted-foreground line-clamp-3">
                                      {gen.preview}
                                  </p>
                              )}
                          </div>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between mt-auto pt-0">
                          <Badge variant="secondary">{gen.type}</Badge>
                          <Button 
                              variant="link" 
                              size="sm" 
                              className="px-0 cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); setSelectedItem(gen); }}
                          >
                              {gen.type === 'Image' ? 'View Image' : 'See Details'}
                          </Button>
                      </CardFooter>
                  </Card>
              ))
          )}
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
            <DialogDescription>
              {selectedItem?.type} generated on {selectedItem && new Date(selectedItem.created_at).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedItem?.type === 'Image' ? (
                <div className="flex flex-col items-center gap-4">
                    <img src={selectedItem.imageUrl} alt={selectedItem.title} className="max-w-full rounded-md shadow-sm" />
                </div>
            ) : (
                <div className="whitespace-pre-wrap text-sm text-foreground bg-muted p-4 rounded-md">
                    {selectedItem?.fullText}
                </div>
            )}
          </div>
          <DialogFooter>
            {selectedItem?.type === 'Image' ? (
                <Button className="cursor-pointer" onClick={async () => {
                    try {
                        const response = await fetch(selectedItem.imageUrl);
                        const blob = await response.blob();
                        const blobUrl = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = blobUrl;
                        a.download = `Contevo_Image_${selectedItem.id}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(blobUrl);
                    } catch (e) {
                        window.open(selectedItem.imageUrl, '_blank');
                    }
                }}>
                    Download Image
                </Button>
            ) : (
                <Button variant="outline" className="cursor-pointer" onClick={() => {
                  if (selectedItem?.fullText) {
                    navigator.clipboard.writeText(`${selectedItem.title}\n\n${selectedItem.fullText}`);
                  }
                }}>
                  Copy Content
                </Button>
            )}
            <Button variant={selectedItem?.type === 'Image' ? "outline" : "default"} className="cursor-pointer" onClick={() => setSelectedItem(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
