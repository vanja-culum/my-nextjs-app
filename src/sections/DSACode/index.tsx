'use client';

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
    <div> 
    <Tabs defaultValue={`file-0`} className="w-full px-8 items-center gap-6">   
      <TabsList>
        {files.map((file, index) => (
          <TabsTrigger key={index} value={`file-${index}`}>
            {file.label}
          </TabsTrigger>
        ))}
      </TabsList>

        {files.map((file, index) => (
            <TabsContent className="w-full" key={index} value={`file-${index}`}>
            <div className="mb-6 p-4 border max-h-[50vh] overflow-auto rounded-lg bg-gray-800">
              {file.error ? (
                <pre className="text-red-500">{file.error}</pre>
              ) : (
                <pre className="text-white whitespace-pre-wrap">{file.content}</pre>
              )}
            </div>
            </TabsContent>
        ))}
    </Tabs>
    </div>
  );
}