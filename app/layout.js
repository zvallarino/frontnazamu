import './globals.css'
import { AuthProvider } from './context/AuthContext';
import Sale from '@/components/Sale';
import Toolbar from '@/components/Toolbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <AuthProvider>
          <div className="flex flex-col min-h-screen w-full bg-red-200">
            <Sale />
            <Toolbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

{/* <Sale />
<Toolbar />
<div className="flex-grow">
  {children}
</div> */}