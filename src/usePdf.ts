import { PDFDocumentProxy, getDocument } from "pdfjs-dist";
import { useEffect, useState } from "react";

export const usePdf = (url: string): [PDFDocumentProxy | undefined] => {
  const [pdf, setPdf] = useState<PDFDocumentProxy | undefined>();

  useEffect(() => {
    (async () => {
      const loadingTask = getDocument({
        url,
      });
      const pdf = await loadingTask.promise;
      setPdf(pdf);
    })();
  }, [url]);

  return [pdf];
};
