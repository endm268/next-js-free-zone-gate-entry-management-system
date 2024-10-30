// app\dashboard\page.tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  } else {
    // Redirect based on user role
    const role = session.user.role;
    console.log(session.user.role);
    
    if (role === 'admin') {
      return redirect('/dashboard/admin');
    } else if (role === 'user') {
      return redirect('/dashboard/user');
    }
  }
}
