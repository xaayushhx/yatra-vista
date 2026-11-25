import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Yatra Vista — The Ultimate Digital Travel Experience",
  description:
    "An award-winning luxury travel platform combining cinematic editorial storytelling, 3D planetary geonavigation, and bespoke AI travel concierge.",
  keywords: [
    "luxury travel",
    "yatra vista",
    "bespoke journeys",
    "ai travel planner",
    "ai travel concierge",
    "amalfi coast",
    "kyoto luxury ryokan",
    "cappadocia hot air balloon",
    "zermatt alps",
  ],
  openGraph: {
    title: "Yatra Vista — The Ultimate Digital Travel Experience",
    description:
      "Transforming travel planning into an immersive art form powered by Yatra Vista AI.",
    url: "https://yatravista.com",
    siteName: "Yatra Vista",
    images: [
      {
        url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Yatra Vista Luxury Mediterranean Sanctuary",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#011f26] text-[#F4EFEA] selection:bg-coral-500/30 selection:text-coral-200">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
          <WhatsAppFloat />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
