"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/userContext";

// all routes
const dashboardRoute = {
  adminRoute: [
    {
      title: "Dashboard",
      url: "/admin",
    },
    {
      title: "Services",
      url: "/admin/services",
    },
    {
      title: "Orders",
      url: "/admin/manage-orders",
    },
  ],

  userRoute: [
    {
      title: "Dashboard",
      url: "/customer",
    },
    {
      title: "Orders",
      url: "/customer/orders",
    },
  ], 
};

const DashboardSidebar = () => {
  const pathname = usePathname();
    const { user } = useUser();
    // curent user role
  const userRole = user?.role; // Example: 'admin' or 'user'
  const routes =
    userRole === "admin" ? dashboardRoute.adminRoute : dashboardRoute.userRoute;

  const isRouteActive = (url: string) => {
    if (!url || url === "#") return false;

    if (url === "/admin" || url === "/customer") {
      return pathname === url;
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  console.log(user)

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mb-4">
        <Link href="/">
          <Image
            alt="Company logo"
            width={150}
            height={300}
            src={"/logo.webp"}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {/* dynamic route */}
          {routes.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={isRouteActive(item.url)}>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* bottom navigation */}
      <SidebarFooter>
        <Link className="w-full " href="/">
          <Button className="bg-pblue hover:bg-bluegray w-full cursor-pointer transition-colors duration-300">Back To Home</Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
