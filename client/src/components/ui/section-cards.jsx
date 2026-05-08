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
import { Button } from "./button";

export function SectionCards() {
  const [generations, setGenerations] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerations() {
      try {
        const res = await fetch("http://localhost:5000/ai/generations", {
          credentials: "include"
        });
        const json = await res.json();
        if (json.success && json.data) {
          const { articles, titles, images, resumes } = json.data;
          
          let combined = [
            ...articles.map(a => ({ ...a, type: 'Article', title: a.topic, preview: a.result_text?.substring(0, 100) + '...' })),
            ...titles.map(t => ({ ...t, type: 'Blog Titles', title: t.keyword, preview: t.result_text?.substring(0, 100) + '...' })),
            ...images.map(i => ({ ...i, type: 'Image', title: i.prompt, preview: 'Generated Image' })),
            ...resumes.map(r => ({ ...r, type: 'Resume Review', title: 'Resume Review', preview: r.analysis_result?.substring(0, 100) + '...' }))
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
            Premium
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
                  <Card key={idx} className="@container/card">
                      <CardHeader>
                          <h2 className="text-md font-semibold truncate">
                              {gen.title}
                          </h2>
                          <div className="flex items-center gap-2 justify-between">
                              <p className="text-sm text-muted-foreground truncate flex-1">
                                  {gen.preview}
                              </p>
                              <Badge variant="secondary">{gen.type}</Badge>
                          </div>
                      </CardHeader>
                  </Card>
              ))
          )}
        </div>
      </div>
    </>
  );
}
