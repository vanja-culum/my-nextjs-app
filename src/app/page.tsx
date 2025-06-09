import { env } from "@/env";
import { DSACode, type FileType } from "@/sections/DSACode";
import { log } from "console";
import Link from "next/link";

export default async function HomePage() {

  const response = await fetch(env.NEXT_PUBLIC_API_BASE_URL + '/dsa', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const files: FileType[] = await response.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">DSA</span> Code
        </h1>
        <h2 className="text-2xl text-center wrap-balance text-white font-semibold">
            Explore the code snippets for various Data Structures and Algorithms.
            Click on the tabs to view different files.
        </h2>

        <p className="text-lg text-white">
          This project is built using Next.js, TypeScript, and <Link  target="_blank" href="https://ui.shadcn.com/">
            <span className="text-[hsl(280,100%,70%)]">ShadCN</span>
          </Link> UI Library.
          <br />
          The code is written by me and fetched from an endpoint using Go language.
          <br />
          You can find the source code on <Link target="_blank" href="https://github.com/vanja-culum/go-exercise">
            <span className="text-[hsl(280,100%,70%)]">GitHub</span>
          </Link>.
        </p>
        <DSACode files={files} />

      </div>
    </main>
  );
}
