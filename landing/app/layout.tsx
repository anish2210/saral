import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saral - Fee Tracking Made Simple for Tutors",
  description: "Stop juggling notebooks and Excel sheets. Track student payments effortlessly with Saral - the modern fee tracking platform built for Indian tutors.",
  keywords: "tutor fee tracking, student payment tracking, tuition management, fee management for tutors, Indian tutors",
  authors: [{ name: "Saral" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Saral - Fee Tracking Made Simple for Tutors",
    description: "Track student payments effortlessly with Saral - built for Indian tutors.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saral - Fee Tracking Made Simple for Tutors",
    description: "Track student payments effortlessly with Saral - built for Indian tutors.",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F59E0B',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
