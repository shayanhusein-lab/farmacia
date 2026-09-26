import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Bricolage_Grotesque, Bungee, Caveat_Brush, DM_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/content/site";
import "./globals.css";

const bungee = Bungee({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-bungee" });
const bricolage = Bricolage_Grotesque({
  weight: ["500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});
const dmSans = DM_Sans({ weight: ["400", "500", "700"], subsets: ["latin"], display: "swap", variable: "--font-dm-sans" });
const caveatBrush = Caveat_Brush({ weight: "400", subsets: ["latin"], display: "swap", variable: "--font-caveat-brush" });
const bodoni = Bodoni_Moda({ weight: "500", subsets: ["latin"], display: "swap", variable: "--font-bodoni" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: site.name,
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFDF7",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bungee.variable} ${bricolage.variable} ${dmSans.variable} ${caveatBrush.variable} ${bodoni.variable} antialiased`}
    >
      <body>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
