import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

// all routes
const dashboardRoute = {
  adminRoute: [
    {
      title: "Dashboard",
      url: "#",
    },
    {
      title: "Services",
      url: "/admin/services",
      isActive: true,
    },
  ],

  userRoute: [
    {
      title: "Dashboard",
      url: "#",
    },
    {
      title: "Orders",
      url: "#",
      isActive: true,
    },
  ],
};

const DashboardSidebar = () => {
  const userRole = "admin"; // Example: 'admin' or 'user'
  const routes =
    userRole === "admin" ? dashboardRoute.adminRoute : dashboardRoute.userRoute;

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
              <SidebarMenuButton asChild isActive={item.isActive}>
                <a href={item.url}>{item.title}</a>
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
