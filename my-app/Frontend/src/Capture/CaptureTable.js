import React from "react";
import html2canvas from "html2canvas";

export default function CaptureTable({ tableRef }) {
  const handleCopyToClipboard = async () => {
    if (!tableRef.current) return;

    try {
      const canvas = await html2canvas(tableRef.current);

      if (navigator.clipboard && navigator.clipboard.write) {
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
        if (!blob) return;
        await navigator.clipboard.write([
          new window.ClipboardItem({ "image/png": blob }),
        ]);
        alert("Table copied to clipboard!");
      } else {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "table.png";
        link.click();
        alert("Table downloaded as image (Safari fallback)!");
      }
    } catch (err) {
      console.error("Failed to copy table:", err);
      alert("Failed to copy/download table. See console for details.");
    }
  };

  return (
    <button
      onClick={handleCopyToClipboard}
      className="px-4 py-2 bg-twohas hover:bg-gray-400 text-white rounded"
    >
      Copy Table as Image
    </button>
  );
}
