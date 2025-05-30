import { useState } from 'react';
import clsx from 'clsx';

export default function Input({
                                          label = "Введите текст",
                                          value,
                                          onChange,
                                          type = "text",
                                          name,
                                          id,
                                      }) {
    const [isFocused, setIsFocused] = useState(false);

    const isFloating = isFocused || value;

    return (
        <div className="relative w-full">
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full px-2 py-2 text-base border border-gray-300 rounded-xl transition-shadow tansition-color focus:outline-none focus:ring-1 focus:ring-gray-900 focus:shadow-md"
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
