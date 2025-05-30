import { useEffect } from "react";

export default function TranslateSwitcher({isNewTranslate, setIsNewTranslate}) {

    useEffect(() => {
        localStorage.setItem("isNewTranslate", isNewTranslate.toString());
    }, [isNewTranslate]);

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                className={`w-12 h-7 rounded-full transition-colors duration-300 ${
                    isNewTranslate ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => setIsNewTranslate(prev => !prev)}
            >
                <div
                    className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                        isNewTranslate ? "translate-x-6" : "translate-x-1"
                    }`}
                />
            </button>
            <span className="text-sm text-gray-700">Новый перевод</span>
        </div>
    );
}
