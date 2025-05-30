import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export default function Textarea({
                                     label = "Введите текст",
                                     value,
                                     onChange,
                                     name,
                                     id,
                                     rows = 1,
                                 }) {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef(null);

    const isFloating = isFocused || value;

    // Автоматическое изменение высоты
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [value]);

    return (
        <div className="relative w-full flex">
            <textarea
                ref={textareaRef}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={rows}
                required={true}
                className="w-full px-2 py-2 text-base resize-none border border-gray-300 rounded-xl transition-shadow focus:outline-none focus:ring-1 focus:ring-gray-900 focus:shadow-md overflow-hidden"
            />
            <label
                htmlFor={id}
                className={clsx(
                    "absolute left-2 rounded-full bg-white px-1 text-gray-500 pointer-events-none transition-all duration-200",
                    isFloating
                        ? "text-xs top-0 -translate-y-1/2"
                        : "text-base top-1/2 -translate-y-1/2"
                )}
            >
                {label}
            </label>
        </div>
    );
}
