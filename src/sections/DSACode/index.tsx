'use client';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type FileType = {
  filename: string;
  content: string;
  label: string
  error?: any;
};

type DSAProps = {
    files: FileType[]
};

export const DSACode =  ({ files }: DSAProps) => {
  return (
    <Tabs defaultValue={`file-0`} className="w-full align-center gap-8">
      <TabsList >
        {files.map((file, index) => (
          <TabsTrigger key={index} value={`file-${index}`}>
            {file.label}
          </TabsTrigger>
        ))}
      </TabsList>

        {files.map((file, index) => (
            <TabsContent key={index} value={`file-${index}`}>
            <div className="mb-6 p-4 border rounded-lg bg-gray-800">
              {file.error ? (
                <pre className="text-red-500">{file.error}</pre>
              ) : (
                <pre className="text-white whitespace-pre-wrap">{file.content}</pre>
              )}
            </div>
            </TabsContent>
        ))}
    </Tabs>

  );
}