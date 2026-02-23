import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MGT Techware | Professional Web Development",
  description:
    "MGT Techware specializes in fast, modern, high-performance websites that deliver measurable results. Custom web development with Next.js, React, and TypeScript.",
  keywords: [
    "web development",
    "Next.js",
    "React",
    "TypeScript",
    "SEO",
    "UI/UX design",
    "MGT Techware",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
