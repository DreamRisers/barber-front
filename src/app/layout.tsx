import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Barbas Club",
  description: "La mejor barbería de la ciudad!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col">
        <Header />
        <Sidebar />
        <main className="flex-grow mx-4 lg:ml-32 mt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
