// src/pdfToImageBase64.js
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// Set the workerSrc to the correct path
GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.min.js`;

const pdfToImageBase64 = async (pdfBase64) => {
    try {
        // Decode base64 PDF
        const pdfData = atob(pdfBase64);
        const loadingTask = getDocument({ data: pdfData });
        const pdf = await loadingTask.promise;
        
        // Get the first page
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });

        // Create a canvas to render the PDF page
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;

        // Convert canvas to base64 image
        const imageBase64 = canvas.toDataURL('image/png');
        
        return imageBase64;
    } catch (error) {
        console.error('Error converting PDF to image:', error);
        return null;
    }
};

export default pdfToImageBase64;
