import React from "react";

export default function Switcher({ checked, onChange, label }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
            {label && <span className="text-sm font-medium">{label}</span>}
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                <div
                    className={`w-12 h-6 rounded-full transition-colors duration-300
                    ${checked ? 'bg-blue-500' : 'bg-gray-300'}`}
                />
                <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300
                    ${checked ? 'translate-x-6' : 'translate-x-0'}`}
                />
            </div>
        </label>
    );
}
