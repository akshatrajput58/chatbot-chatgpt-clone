import { SessionProvider } from '../components/SessionProvider';
import SideBar from '../components/SideBar';
import { getServerSession } from 'next-auth';
import '../styles/globals.css';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import Login from '../components/Login';
import ClientProvider from '../components/ClientProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ): (
        <div className='flex'>
        <div className='bg-[#252A37] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]'>
        <SideBar />
        </div>

       <ClientProvider />

        <div className='bg-[#171923] flex-1'>{children}</div> 
        </div>
          )}
        </SessionProvider>
        </body>
    </html>
  );
}
