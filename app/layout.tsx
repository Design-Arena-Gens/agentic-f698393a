import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Export Sales AI Agent - LinkedIn, WhatsApp, Gmail",
  description: "AI-powered sales automation for export business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
