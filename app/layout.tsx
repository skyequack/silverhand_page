import type { Metadata } from "next";
import { Inter, Orbit, Tomorrow } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbit = Orbit({
  subsets: ["latin"],
  variable: "--font-orbit",
  weight: "400",
});

const tomorrow = Tomorrow({
  subsets: ["latin"],
  variable: "--font-tomorrow",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SilverHand | EMG-Controlled Hand Exoskeleton",
  description: "Low-cost EMG-controlled hand exoskeleton for arthritis and neuromuscular impairment. Research project documenting design, engineering, and build instructions.",
  keywords: ["EMG", "exoskeleton", "arthritis", "assistive technology", "biomechatronics", "open source hardware"],
  authors: [{ name: "Omer" }],
  openGraph: {
    title: "SilverHand | EMG-Controlled Hand Exoskeleton",
    description: "Low-cost EMG-controlled hand exoskeleton for arthritis and neuromuscular impairment.",
    type: "website",
    images: ["/img/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SilverHand | EMG-Controlled Hand Exoskeleton",
    description: "Low-cost EMG-controlled hand exoskeleton for arthritis and neuromuscular impairment.",
    images: ["/img/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbit.variable} ${tomorrow.variable} antialiased bg-black text-gray-300`}
      >
        <div className="relative min-h-screen">
          <Header />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}


