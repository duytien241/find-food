"use client"

import React from "react"
import MenuButton from "./MenuButton"

import { Space_Mono as SpaceMono } from "next/font/google"
import { useRouter } from "next/navigation"

const mono = SpaceMono({
  variable: "--font-mono",
  weight: ["400", "700"],
  preload: true,
  subsets: ["latin"],
})

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  return <>1231</>
}
