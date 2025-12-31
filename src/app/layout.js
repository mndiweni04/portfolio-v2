import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar"; 
import HeroBackground from "../components/HeroBackground"; 
import ThemeToggle from "../components/ThemeToggle";

// Initialize Nunito
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"], // Loading the weights needed for design
});

export const metadata = {
  title: "Mandla Ndiweni - Portfolio",
  description: "Portfolio of Mandla Ndiweni",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
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