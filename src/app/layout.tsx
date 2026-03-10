import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
});

export const metadata: Metadata = {
  title: "GearSense AI - Intelligent Tech Product Recommendations",
  description: "Find the perfect smartphone, laptop, or gaming gear with AI-powered recommendations. Get personalized suggestions based on your budget and usage needs.",
  keywords: ["AI recommendations", "tech products", "smartphone finder", "laptop advisor", "gaming gear", "product comparison", "GearSense"],
  authors: [{ name: "GearSense AI Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "GearSense AI",
    description: "AI-powered tech product recommendations tailored to your needs",
    url: "https://gearsense.ai",
    siteName: "GearSense AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GearSense AI",
    description: "AI-powered tech product recommendations tailored to your needs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${kanit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
