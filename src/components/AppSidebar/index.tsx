
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { SIDEBAR_MENU_ITEMS } from "@/constants/sidebarMenuItems";


export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
             <img src="png/truck.png" width={50} /> Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {SIDEBAR_MENU_ITEMS.map((item) => (
                  <Collapsible
                    key={item.title}
                    defaultOpen={false}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div className="flex items-center">
                            <item.icon className="mr-2" />
                            <span>{item.title}</span>
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="pl-4 text-left">
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title} className="pl-2">
                              <Link to={subItem.url} className="flex items-center">
                                <subItem.icon size={18} className="mr-2" />
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }