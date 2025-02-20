import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MaintenanceWrapper from "./components/MaintenanceWrapper"; // Import the new component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Todo App",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MaintenanceWrapper>{children}</MaintenanceWrapper>
      </body>
    </html>
  );
}
