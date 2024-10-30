'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTransition } from 'react';

export function UserNav() {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  // Define a set of colors for the avatar background
  const avatarColors = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-purple-500'
  ];
  // Select a random color from the avatarColors array for each session
  const randomColor =
    avatarColors[Math.floor(Math.random() * avatarColors.length)];

  if (session) {
    return (
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className={`h-8 w-8 ${randomColor}`}>
              <AvatarImage
                src={session.user?.image ?? ''}
                alt={session.user?.name ?? ''}
              />
              <AvatarFallback>{session.user?.name?.[0] ?? 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1 text-right">
              <p className="text-sm font-medium leading-none">
                {session.user?.name || 'مستخدم'}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => startTransition(() => signOut())}
            className="text-right hover:bg-transparent hover:!text-red-600"
          >
            <LogOut className="ml-2 h-4 w-4" />
            {isPending ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null; // Or a placeholder for unauthenticated users
}
