import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import { ThemeContextProvider } from '@/context/ThemeContext';
import ThemeProvider from '@/providers/ThemeProvider';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import AuthProvider from '@/providers/AuthProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'NextJS blog app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
