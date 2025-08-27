import React from "react";

export default function Recipe() {
  return (
    <div className="overflow-auto border rounded">
      <div className="grid grid-cols-5 auto-rows-min border-b">
        <div className="border p-2 font-bold text-center">item</div>
        <div className="border p-2 font-bold text-center">Vendor</div>
        <div className="border p-2 font-bold text-center">Volume/pack</div>
        <div className="border p-2 font-bold text-center">Price</div>
        <div className="border p-2 font-bold text-center">Unit Price</div>
      </div>
    </div>
  );
}
