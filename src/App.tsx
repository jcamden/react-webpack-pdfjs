import "tailwindcss/tailwind.css";

import * as React from "react";
import { useState } from "react";

import { Pdf } from "./Pdf/Pdf";
import { usePdf } from "./usePdf";

export const App: React.FC = ({}) => {
  // point this at the URL of the pdf you want to test
  const [pdfUrl, setPdfUrl] = useState("./test.pdf");
  const [pdf] = usePdf(pdfUrl);

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center p-16">
      <div>
        <Pdf pdf={pdf} pageNum={1} scale={1} textLayer />
      </div>
    </div>
  );
};
