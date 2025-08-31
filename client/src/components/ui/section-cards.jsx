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
  return (
    <>
      <div
        className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Creations</CardDescription>
          <CardTitle className="text-2xl tabular-nums @[250px]/card:text-3xl">
            3
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
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @5xl/main:grid-cols-1">
      <div className="py-3 text-lg font-semibold flex-1 rounded-xl md:min-h-min">
        Recent Creations
      </div>
      <Card className="@container/card">
        <CardHeader>
          <h2 className="text-md ">
            Article Title
          </h2>
          <div className="flex items-center gap-2 justify-between">
          <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
          <Button className="bg-primary bg-sidebar-accent px-4 py-2 rounded-md cursor-pointer hover:bg-primary/40">
            Type
          </Button>
          </div>
        </CardHeader>
      </Card>
      </div>
    </>
  );
}
