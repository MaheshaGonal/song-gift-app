import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Song For Them — Custom Songs & Videos From Your Memories",
  description:
    "Turn a wedding, birthday, or anniversary story into an original song, or a song plus custom video.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
