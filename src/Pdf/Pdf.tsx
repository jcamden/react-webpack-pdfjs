import "pdfjs-dist/web/pdf_viewer.css";

import { PDFDocumentProxy } from "pdfjs-dist";
import * as React from "react";
import { useRef, useState } from "react";

import { useRenderPdf } from "./useRenderPdf";

export interface PdfProps {
  pdf: PDFDocumentProxy | undefined;
  pageNum: number;
  scale: number;
  textLayer: boolean;
}

export const Pdf: React.FC<PdfProps> = (pdfProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const [textStyle, setTextStyle] = useState({
    left: `0px`,
    top: `0px`,
    height: `0px`,
    width: `0px`,
  });

  useRenderPdf({ pdfProps, canvasRef, textLayerRef, setTextStyle });

  return (
    <div className="flex flex-column align-center justify-center relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {pdfProps.textLayer && (
        <div
          ref={textLayerRef}
          className="textLayer"
          style={{ ...textStyle }}
        ></div>
      )}
    </div>
  );
};

export default Pdf;
