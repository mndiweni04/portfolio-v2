import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar"; 
import HeroBackground from "../components/HeroBackground"; 
import ThemeToggle from "../components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mandla Ndiweni - Portfolio",
  description: "Portfolio of Mandla Ndiweni",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeroBackground>
          <div className="wrap">
            <Navbar /> 
            
            <ThemeToggle />
            
            <main className="scroll-container">
                {children}
            </main>

            <div className="pgFooter">
              <p className="CopyRight">© 2025 Mandla Ndiweni. All Rights Reserved</p>
            </div>
          </div>
        </HeroBackground>
      </body>
    </html>
  );
}