'use client';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type CompProps = {};
export default function ThemeToggle({}: CompProps) {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="relative h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">تغيير السمة</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="flex w-[20] flex-col items-end justify-start text-right"
      >
        <DropdownMenuItem
           className="w-full flex justify-end cursor-pointer"
          onClick={() => setTheme('light')}
        >
          الوضع الفاتح
        </DropdownMenuItem>
        <DropdownMenuItem  className="w-full flex justify-end cursor-pointer" onClick={() => setTheme('dark')}>
          الوضع الداكن
        </DropdownMenuItem>
        <DropdownMenuItem
           className="w-full flex justify-end cursor-pointer"
          onClick={() => setTheme('system')}
        >
          حسب النظام
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
