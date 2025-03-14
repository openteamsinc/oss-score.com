import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenTeams • Open Source Scoring",
  description: "Open source scoring project",
};

function Header() {
  return (
    <header className="bg-[#0A165D] p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          {/* eslint-disable @next/next/no-img-element */}
          <img src="/logo.svg" className="h-8" alt="openteams logo" />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li className="flex items-center">
              <Link
                href="https://github.com/openteamsinc/score"
                className="flex items-center hover:underline"
              >
                <Icon path={mdiGithub} size={1} />
                openteamsinc/score
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-8 bg-gray-200 p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} OpenTeams. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <ToastContainer />
          <Header />
          <main className="container mx-auto grow px-4 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
