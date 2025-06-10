import { env } from "@/env";
import { DSACode, type FileType } from "@/sections/DSACode";
import { BstVisualizer } from "@/sections/DSACode/components/BstVisualizer";
import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Data Structures and Algorithms',
}

export default async function Page() {

  const response = await fetch(env.NEXT_PUBLIC_API_BASE_URL + '/dsa', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });


  const files = await response.json() as FileType[];
    return <div className="container flex flex-col justify-center gap-8 px-24 py-16">
    <h1 className="text-5xl font-extrabold text-center tracking-tight sm:text-[5rem]">
      <span className="text-[hsl(280,100%,70%)]">DSA</span> Code
    </h1>
    <h2 className="text-2xl  font-semibold">
        Explore the code snippets for various Data Structures and Algorithms.
        Click on the tabs to view different files.
    </h2>

    <p className="text-lg">
      This project is built using Next.js, TypeScript, and <Link  target="_blank" href="https://ui.shadcn.com/">
        <span className="text-[hsl(280,100%,70%)]">ShadCN</span>
      </Link> UI Library.
      The code is written by me and fetched from an endpoint using Go language.
      You can find the source code on <Link target="_blank" href="https://github.com/vanja-culum/go-exercise">
        <span className="text-[hsl(280,100%,70%)]">GitHub</span>
      </Link>.
    </p>
    <DSACode files={files} />
    <BstVisualizer />

  </div>
}