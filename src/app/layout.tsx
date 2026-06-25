import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

export const metadata: Metadata = {
  metadataBase: new URL("https://apex-terminal.vercel.app"),
  title: "APEX Terminal | Multi-Agent Financial Intelligence Platform",
  description: "An institutional-grade AI investment research platform powered by LangGraph. Stream live agent debates and generate professional investment memos.",
  keywords: [
    "AI investment",
    "Stock analysis",
    "LangGraph",
    "Financial research terminal",
    "Bloomberg style",
    "Portfolio simulator",
    "Multi-agent AI"
  ],
  authors: [{ name: "APEX AI Group" }],
  openGraph: {
    title: "APEX Terminal | Multi-Agent Financial Intelligence Platform",
    description: "An institutional-grade AI investment research platform powered by LangGraph. Stream live agent debates and generate professional investment memos.",
    url: "https://apex-terminal.vercel.app",
    siteName: "APEX Terminal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "APEX Terminal Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX Terminal | Multi-Agent Financial Intelligence Platform",
    description: "An institutional-grade AI investment research platform powered by LangGraph. Stream live agent debates and generate professional investment memos.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Microsoft Clarity */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}

        {children}
      </body>
    </html>
  );
}
