import { env } from "@/env";
import { DSACode, type FileType } from "@/sections/DSACode";
import { log } from "console";

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
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">DSA</span> Code
        </h1>

        <DSACode files={files} />

      </div>
    </main>
  );
}
