"use client";

import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import Footer from "@/components/footer";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const [search, setSearch] = useState("");
  return (
    <html lang="en">
      <body className={`${montserrat.className} body`}>
        <Navbar
          logo={require("@/public/logo.png")}
          search={search}
          setSearch={setSearch}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
