import React, { useState } from 'react';

const StatusFilters = ({ value, onChange }) => { 
    const [isOpen, setIsOpen] = useState(false);
    const statuses = [
        { label: "All Status", value: "" },
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" }
    ];
    const currentLabel = statuses.find(s => s.value === value)?.label || "Status";
    const handleSelect = (statusValue) => {
        onChange(statusValue); 
        setIsOpen(false);
    };
    return (
        <div className="relative w-full  sm:w-50  text-sm">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-4 pr-2 py-3  bg-white text-main-background outline-none border border-gray-500/30    focus:outline-none focus:ring-0"
            >
                <span>{currentLabel}</span>
                <svg
                    className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#6B7280"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className={`absolute left-0 w-full mt-1 bg-white border-none  shadow-lg z-10 overflow-hidden transition-all duration-200 ease-out origin-top ${isOpen
                        ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
                    }`}
            >
                <ul className="py-2">
                    {statuses.map((status) => (
                        <li
                            key={status.value}
                            className={`px-4 py-2 hover:text-main-background/60 cursor-pointer transition-colors ${value === status.value ? "bg-gray-100 font-medium" : ""}`}
                            onClick={() => handleSelect(status.value)}
                        >
                            {status.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StatusFilters;