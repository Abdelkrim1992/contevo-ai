import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/ui/nav-main"
import { NavUser } from "@/components/ui/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/home",
      icon: IconDashboard,
    },
    {
      title: "Write Articles",
      url: "/dashboard/write-articles",
      icon: IconListDetails,
    },
    {
      title: "Blog Titles",
      url: "/dashboard/blog-titles",
      icon: IconChartBar,
    },
    {
      title: "Generate Images",
      url: "/dashboard/generate-images",
      icon: IconFolder,
    },
    {
      title: "Remove Background",
      url: "/dashboard/remove-background",
      icon: IconChartBar,
    },
    {
      title: "Remove Objects",
      url: "/dashboard/remove-objects",
      icon: IconChartBar,
    },
    {
      title: "Review Resume",
      url: "/dashboard/review-resume",
      icon: IconChartBar,
    },
    {
      title: "Team",
      url: "/dashboard/community",
      icon: IconUsers,
    },
  ],
}

export function AppSidebar({
  ...props
}) {


  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Contevo AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} className="cursor-pointer mp-5" />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={user.user} /> */}
      </SidebarFooter>
    </Sidebar>
  );
}
