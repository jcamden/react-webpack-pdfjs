import { PDFDocumentProxy } from "pdfjs-dist";
import * as pdfjs from "pdfjs-dist/webpack";

import { PdfProps } from "./Pdf";

type SetTextStyle = React.Dispatch<
  React.SetStateAction<{
    left: string;
    top: string;
    height: string;
    width: string;
  }>
>;

type CanvasRef = React.MutableRefObject<HTMLCanvasElement>;
type DivRef = React.MutableRefObject<HTMLDivElement>;

export interface RenderPdfParams {
  pdfProps: PdfProps;
  canvasRef: CanvasRef;
  textLayerRef: DivRef;
  setTextStyle: SetTextStyle;
}

export const renderPdf = async ({
  pdfProps,
  canvasRef,
  textLayerRef,
  setTextStyle,
}: RenderPdfParams) => {
  const { pdf, pageNum, scale, textLayer } = pdfProps;
  const page = await pdf.getPage(pageNum);

  const viewport = page.getViewport({ scale: scale });

  // Prepare canvas using PDF page dimensions
  if (canvasRef && canvasRef.current) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext);

      textLayer &&
        (async () => {
          const textContent = await page.getTextContent();

          setTextStyle({
            left: `${canvas.offsetLeft}px`,
            top: `${canvas.offsetTop}px`,
            height: `${canvas.height}px`,
            width: `${canvas.width}px`,
          });

          pdfjs.renderTextLayer({
            textContent: textContent,
            container: textLayerRef.current,
            viewport: viewport,
            textDivs: [],
          });
        })();
    }
  }
};
