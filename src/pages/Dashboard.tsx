import { Link } from "react-router-dom";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar, { SidebarItem } from "@/components/Sidebar";

// Objeto de itens da sidebar com subItems aninhados
const sidebarItems = [
  {
    icon: Home,
    sizeIcon: 20,
    text: "Dashboard",
    link: "/dashboard",
    active: true,
    alert: false,
    subItems: [], // Adicionar subItems se necessário
  },
  {
    icon: Users,
    sizeIcon: 20,
    text: "Users",
    link: null,
    active: false,
    alert: false,
    subItems: [
      {
        icon: Search,
        sizeIcon: 16,
        text: "Sublevel 1",
        link: null,
        active: false,
        alert: false,
        subItems: [
          { icon: Search, sizeIcon: 14, text: "Sublevel 1.1", link: "/users/sublevel11", active: false, alert: false, subItems: [] },
          { icon: Search, sizeIcon: 14, text: "Sublevel 1.2", link: "/users/sublevel12", active: false, alert: false, subItems: [] }
        ]
      },
      { icon: Search, sizeIcon: 16, text: "Sublevel 2", link: "/users/sublevel2", active: false, alert: false, subItems: [] },
      { icon: Search, sizeIcon: 16, text: "Sublevel 3", link: "/users/sublevel3", active: false, alert: false, subItems: [] }
    ]
  },
  {
    icon: LineChart,
    sizeIcon: 20,
    text: "Inventory",
    link: "/inventory",
    active: false,
    alert: false,
    subItems: [],
  },
  {
    icon: Package,
    sizeIcon: 20,
    text: "Orders",
    link: "/orders",
    active: false,
    alert: true,
    subItems: [],
  },
  {
    icon: Package2,
    sizeIcon: 20,
    text: "Billings",
    link: "/billings",
    active: false,
    alert: false,
    subItems: [],
  },
  {
    icon: ShoppingCart,
    sizeIcon: 20,
    text: "Settings",
    link: "/settings",
    active: false,
    alert: false,
    subItems: [],
  },
  {
    icon: CircleUser,
    sizeIcon: 20,
    text: "Account",
    link: "/account",
    active: false,
    alert: false,
    subItems: [],
  }
];

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar>
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            sizeIcon={item.sizeIcon}
            text={item.text}
            link={item.link}
            active={item.active}
            alert={item.alert}
            subItems={item.subItems} // Passar subItems para permitir até 3 níveis
          />
        ))}
      </Sidebar>
      <div className="flex flex-col flex-grow min-h-screen">
        <header className="flex ml-12 md:ml-0 h-16 max-h-16 items-center gap-4 border-b bg-gray-50 px-4 lg:px-6 z-40">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Procurar itens..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no items
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a item.
              </p>
              <Button className="mt-4">Add Item</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
