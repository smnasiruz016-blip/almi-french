import type { Metadata } from "next";
import { Inter, Allura } from "next/font/google";
import "./globals.css";
import { GlobalHeader } from "@/components/GlobalHeader";
import { GlobalFooter } from "@/components/GlobalFooter";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const allura = Allura({ variable: "--font-allura", subsets: ["latin"], weight: "400", display: "swap" });

const SITE_URL = "https://almifrench.almiworld.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AlmiFrench | TEF, TCF, DELF & DALF Practice with Honest AI Feedback",
    template: "%s · AlmiFrench",
  },
  description:
    "Practise real TEF, TCF, DELF and DALF task formats across all CEFR levels (A1–C2), with honest AI score estimates mapped to CEFR and Canada's NCLC — for immigration, citizenship, study, and a lifetime French diploma. Original French material, never copied.",
  applicationName: "AlmiFrench",
  authors: [{ name: "AlmiWorld" }],
  keywords: ["TEF Canada", "TCF Canada", "DELF B2", "DALF C1", "TEFAQ", "TCF Québec", "French test for Canada immigration", "French test for Express Entry", "French citizenship DELF B2", "NCLC", "CEFR", "French exam practice", "AlmiFrench", "AlmiWorld"],
  openGraph: {
    title: "AlmiFrench — honest TEF · TCF · DELF · DALF practice",
    description: "Real French-exam task formats with honest AI estimates mapped to CEFR and Canada's NCLC. Choose the test your goal needs.",
    url: SITE_URL,
    siteName: "AlmiFrench",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "AlmiFrench — TEF · TCF · DELF · DALF practice", description: "Honest French-exam estimates mapped to CEFR and NCLC — ranges, not inflated numbers." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${allura.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <GlobalHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <GlobalFooter />
      </body>
    </html>
  );
}
