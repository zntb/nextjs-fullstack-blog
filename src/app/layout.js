import { Inter } from 'next/font/google';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './globals.css';
import { ThemeContextProvider } from '../context/ThemeContext';
import ThemeProvider from '../providers/ThemeProvider';
import AuthProvider from '../providers/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Blog App',
  description: 'NextJS blog app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
