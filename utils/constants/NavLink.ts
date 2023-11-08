import {
    DashboardIcon,
    LeadsIcon,
    CalendarIcon,
    ClientChatsIcon,
    TransactionsIcon,
    UsersIcon,
    CustomersIcon,
    ClassesIcon,
  } from "@/components/icons";
  import { LinkType } from "@/lib/interfaces/link.interface";
  
  const MenuLinksAdmin: LinkType[] = [
    {
      href: "/dashboard",
      label: "dashboard",
      icon: DashboardIcon,
    },
    { href: "/calendar", label: "calendar", icon: CalendarIcon },
    { href: "/classes", label: "classes", icon: ClassesIcon },
    { href: "/customers", label: "customers", icon: CustomersIcon },
    { href: "/leads", label: "leads", icon: LeadsIcon },
    { href: "/notifications", label: "notifications", icon: ClientChatsIcon },
    { href: "/transactions", label: "transactions", icon: TransactionsIcon },
    { href: "/users", label: "users", icon: UsersIcon },
  ];
  
  const MenuLinksMonitoring: LinkType[] = [
    { href: "/dashboard", label: "dashboard", icon: DashboardIcon },
    { href: "/classes", label: "classes", icon: ClassesIcon },
    { href: "/customers", label: "customers", icon: CustomersIcon },
    { href: "/notifications", label: "notifications", icon: ClientChatsIcon },
  ];
  
  const MenuLinksFinancial: LinkType[] = [
    { href: "/dashboard", label: "dashboard", icon: DashboardIcon },
    { href: "/customers", label: "customers", icon: CustomersIcon },
    { href: "/transactions", label: "transactions", icon: TransactionsIcon },
    { href: "/leads", label: "leads", icon: LeadsIcon },
  ];
  
  const MenuLinksTeacher: LinkType[] = [
    { href: "/dashboard", label: "dashboard", icon: DashboardIcon },
    { href: "/calendar", label: "calendar", icon: CalendarIcon },
    { href: "/classes", label: "classes", icon: ClassesIcon },
    { href: "/notifications", label: "notifications", icon: ClientChatsIcon },
  ];
  
  const MenuLinksNoRole: LinkType[] = [
    { href: "/dashboard", label: "dashboard", icon: DashboardIcon },
  ];
  
  const MenuLinks = {
    "general manager": MenuLinksAdmin,
    "customer support": MenuLinksMonitoring,
    "sales manager": MenuLinksFinancial,
    teacher: MenuLinksTeacher,
    "no role": MenuLinksNoRole,
  };
  
  export default MenuLinks;
  