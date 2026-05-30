import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Hephzi Angela Tagoe | Scientist, Communicator, Founder",
  description: "Official portfolio of Dr. Hephzi Angela Tagoe: multi-award-winning research scientist, science communicator, and founding director of GHScientific. Building bridges between science, education, and community.",
  keywords: [
    "Dr. Hephzi Angela Tagoe",
    "Hephzi Tagoe",
    "GHScientific",
    "Science Communicator",
    "Skin Biologist",
    "Winston Churchill Fellow",
    "Basildon Street Science Festival",
    "Black Women in STEM",
    "Science Education"
  ],
  authors: [{ name: "Dr. Hephzi Angela Tagoe" }],
  creator: "Dr. Hephzi Angela Tagoe",
  openGraph: {
    title: "Dr. Hephzi Angela Tagoe | Scientist, Communicator, Founder",
    description: "Building bridges between science, education, and community. Skin biologist, founding director of GHScientific, and Churchill Fellow.",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#E6ECF4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
