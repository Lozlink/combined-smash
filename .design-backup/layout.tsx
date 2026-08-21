import type { Metadata } from "next";
import { Barlow, Big_Shoulders, Geist_Mono } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Combined Smash Repairs — Five Dock",
  description:
    "Smash repairs, spray painting and mechanical repairs on Parramatta Road, Five Dock. Insurance claims handled start to finish. Call (02) 9799 9433.",
  openGraph: {
    title: "Combined Smash Repairs — Five Dock",
    description:
      "Panel beating, colour-matched spray painting and mechanical repairs under one roof. 3A/61-73 Parramatta Rd, Five Dock NSW.",
    type: "website",
    locale: "en_AU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${bigShoulders.variable} ${barlow.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
