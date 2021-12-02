import { times } from "lodash";
import { useEffect } from "react";

import { RenderPdfParams, renderPdf } from "./renderPdf";

export const useRenderPdf = ({
  pdfProps,
  canvasRef,
  textLayerRef,
  setTextStyle,
}: RenderPdfParams): void => {
  useEffect(() => {
    textLayerRef.current?.children &&
      times(textLayerRef.current.children.length, () =>
        textLayerRef.current?.removeChild(textLayerRef.current.children[0])
      );

    pdfProps.pdf &&
      renderPdf({ pdfProps, canvasRef, textLayerRef, setTextStyle });
  }, [pdfProps]);

  return;
};
