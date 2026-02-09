import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

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
        {GSC_VERIFICATION && (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        )}
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {/* Consent Mode defaults — must fire before GTM */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
            });
          `}
        </Script>

        {/* Google Tag Manager */}
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          </>
        )}

        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
