import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadStringsAsZip = (strings: string[], fileNames: string[], zipFileName: string) => {
    console.log(`Downloading details: fileNames: ${fileNames}, zipFileName: ${zipFileName}`);
    const zip = new JSZip();

    // Add each string as a file in the zip
    strings.forEach((content, index) => {
        const fileName = fileNames[index] || `file${index + 1}.common`;
        zip.file(fileName, content);
    });

    // Generate the zip file asynchronously and trigger download
    zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, zipFileName);
    });
};

export const exportStringForDownload = (content: string, fileName: string) => {
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
}