import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { AppShell } from "@/components/chrome/app-shell";
import { JsonLd } from "@/components/chrome/json-ld";
import { Providers } from "@/components/providers";
import {
  DEFAULT_DESCRIPTION,
  OG_DESCRIPTION,
  OG_TITLE,
  ORG_NAME,
  PRODUCT_NAME,
  SITE_ORIGIN,
  TITLE_BRAND,
} from "@/lib/site";
import { absUrl } from "@/lib/mount";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: OG_TITLE,
    template: `%s | ${TITLE_BRAND}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: PRODUCT_NAME,
  authors: [{ name: ORG_NAME }],
  creator: ORG_NAME,
  publisher: ORG_NAME,
  keywords: [
    "AP World History Modern",
    "Unit 2 Networks of Exchange",
    "2027 AP exam",
    "Anannt Education Dubai",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: PRODUCT_NAME,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: absUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: absUrl("/"),
  },
  category: "education",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <JsonLd />
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
