import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Providers from "@/components/providers/session-provider"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "500",
    "800"
  ],
  display: "swap",
})

export const metadata: Metadata = {
  title: "ROSE OC",
  description: "Created and sponsored by Epreen",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}