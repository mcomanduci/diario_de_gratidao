import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const viewport = {
  themeColor: "#4A7C59",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Diário de Gratidão",
    default: "Diário de Gratidão",
  },
  description:
    "Registre seus momentos de gratidão e acompanhe seu crescimento pessoal",
  keywords: ["gratidão", "diário", "bem-estar", "desenvolvimento pessoal"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gratidão",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body
        className={`${lora.variable} ${nunito.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
