import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HouseHive.ai — AI-Powered Property Management",
  description:
    "Your smart co-host for every home, rental, and guest. Manage tenants, automate maintenance, and optimize rent with AI.",
  openGraph: {
    title: "HouseHive.ai — AI-Powered Property Management Platform",
    description:
      "HouseHive automates tenant communication, maintenance tracking, and rent optimization using AI.",
    url: "https://househive.ai",
    siteName: "HouseHive.ai",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HouseHive.ai — Smart Co-Host for Every Property",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HouseHive.ai — AI-Powered Property Management Platform",
    description:
      "Your smart co-host for every home, rental, and guest. Manage tenants, automate maintenance, and optimize rent with AI.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="theme-color"
          content="#111111"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
