'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { navItems } from '@/constants/data';
import { ChevronRight, GalleryVerticalEnd, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Breadcrumbs } from '../breadcrumbs';
import { Icons } from '../icons';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { UserNav } from './user-nav';
import { Separator } from '../ui/separator';
import { useTransition } from 'react';

// تعريف معلومات الشركة، مثل الاسم والشعار والخطة
export const company = {
  name: 'شركة Acme',
  logo: GalleryVerticalEnd,
  plan: 'مؤسسة'
};

export default function AppSidebar({
  children
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // التأكد من أن المكون يتم عرضه فقط على جانب العميل بعد التحميل الأولي
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // عرض رسالة تحميل حتى يتم تهيئة المكون بالكامل
  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      {/* الحاوية الرئيسية للشريط الجانبي */}
      <Sidebar collapsible="icon" side="right" className="bg-black">
        {/* قسم رأس الشريط الجانبي (تم التعليق عليه) */}
        <SidebarHeader>
          {/* مثال لعرض الشعار واسم الشركة */}
          {/* أزل التعليق إذا كنت تريد عرض تفاصيل الشركة */}
          {/* <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <company.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-right text-sm leading-tight">
              <span className="truncate font-semibold">{company.name}</span>
              <span className="truncate text-xs">{company.plan}</span>
            </div>
          </div> */}
        </SidebarHeader>

        {/* المحتوى الرئيسي للشريط الجانبي الذي يحتوي على عناصر التنقل */}
        <SidebarContent className="overflow-x-hidden">
          <SidebarGroup>
            <SidebarGroupLabel>نظرة عامة</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                return item?.items && item?.items?.length > 0 ? (
                  // عنصر قائمة قابل للطي مع عناصر فرعية
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={item.isActive}
                    className="group"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={pathname === item.url}
                          className={`flex items-center gap-2 rounded-lg${
                            pathname === item.url
                              ? 'bg-blue-600 font-semibold text-white' // تمييز العنصر النشط
                              : 'bg-transparent text-gray-800 hover:bg-blue-100'
                          } transition duration-200`}
                        >
                          {item.icon && (
                            <Icon className="h-5 w-5 text-gray-600" /> // حجم الأيقونة ثابت
                          )}
                          <span className="text-lg">{item.title}</span>
                          {/* سهم للإشارة إلى المحتوى القابل للطي، يدور عند الفتح */}
                          <ChevronRight className="ml-auto h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="ml-8 mt-2 space-y-1">
                          {/* عرض العناصر الفرعية مع تحسينات النمط */}
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.url}
                                className={`block rounded-md text-base ${
                                  pathname === subItem.url
                                    ? 'bg-blue-200 font-medium text-blue-700' // تمييز العنصر الفرعي النشط
                                    : 'text-gray-700 hover:bg-gray-100'
                                } transition duration-150`}
                              >
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  // عنصر قائمة عادي بدون عناصر فرعية
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      className={`mt-2 flex items-center rounded-lg px-2 py-6 ${
                        pathname === item.url
                          ? 'bg-customBlue-light font-semibold text-white'
                          : 'bg-transparent text-gray-800 hover:bg-blue-100'
                      } transition duration-200`}
                    >
                      <Link href={item.url} className="flex items-center">
                        <Icon className="mr-3 h-6 w-6" />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* تذييل الشريط الجانبي مع زر تسجيل الخروج */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => startTransition(() => signOut())}
                className={`bg-red-500 text-white hover:bg-red-700 hover:text-white ${
                  isPending ? 'cursor-not-allowed opacity-70' : ''
                }`}
                disabled={isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isPending ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج'}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        {/* شريط جانبي للأيقونات فقط (للعرض المصغر) */}
        <SidebarRail />
      </Sidebar>

      {/* منطقة الشريط الجانبي المتضمنة، مع رأس ومحتوى الصفحة الرئيسي */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          {/* شريط تنقل وشريط جانبي لعرض الروابط */}
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>

          {/* تنقل المستخدم وتبديل السمة */}
          <div className="flex items-center gap-4 px-4">
            <UserNav />
            <ThemeToggle />
          </div>
        </header>

        {/* فاصل ومنطقة المحتوى الرئيسي */}
        <Separator />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
