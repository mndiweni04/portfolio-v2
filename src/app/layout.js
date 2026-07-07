/* src/app/layout.js */
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";  
import HeroBackground from "../components/HeroBackground";  
import ThemeToggle from "../components/ThemeToggle";
import FloatingRequestBtn from "../components/FloatingRequestBtn";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  title: "Mandla Ndiweni - Portfolio",
  description: "Portfolio of Mandla Ndiweni",
  icons: {
    icon: '/logo-mn.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <HeroBackground>
          <div className="wrap" style={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            
            <ThemeToggle />
            <FloatingRequestBtn />
            
            <main className="scroll-container">
                {children}
            </main>

            <div className="pgFooter">
              <p className="CopyRight">© 2026 Mandla Ndiweni. All Rights Reserved</p>
            </div>
          </div>
        </HeroBackground>
      </body>
    </html>
  );
}