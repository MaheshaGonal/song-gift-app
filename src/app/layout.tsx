import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Song For Them — Custom Songs & Videos From Your Memories",
  description:
    "Turn a wedding, birthday, or anniversary story into an original song, or a song plus custom video.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
      <body>{children}</body>
    </html>
  );
}