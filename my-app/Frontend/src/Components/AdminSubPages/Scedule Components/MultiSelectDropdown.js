import React, { useState, useRef, useEffect } from "react";

export default function MultiSelectDropdown({
  options,
  selected,
  onChange,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (disabled) return;
    if (selected.some((emp) => emp._id === option._id)) {
      onChange(selected.filter((o) => o._id !== option._id));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`w-full border rounded px-2 py-1 text-left text-xs whitespace-normal break-words min-h-[2.5rem] ${
          disabled
            ? "bg-twohas text-white cursor-not-allowed"
            : "bg-white text-black"
        }`}
      >
        {selected.length === 0
          ? "Select Employees"
          : selected.map((emp) => emp.name).join(", ")}
      </button>

      {open && !disabled && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-auto rounded border bg-white shadow-lg text-xs">
          {options.map((option) => (
            <label
              key={option._id}
              className="flex items-center gap-2 px-3 py-1 cursor-pointer hover:bg-gray-100 select-none"
            >
              <input
                type="checkbox"
                checked={selected.some((emp) => emp._id === option._id)}
                onChange={() => toggleOption(option)}
                className="cursor-pointer"
              />
              {option.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
