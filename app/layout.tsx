import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shreyas Biradar | Portfolio",
  description:
    "A dark, interactive portfolio for Shreyas Biradar featuring experience, projects, achievements, and contact details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
