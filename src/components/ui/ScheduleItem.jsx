import {ArrowRight, ChevronRight} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {formatVerse} from "../../utils";
import {Verses} from "../../data";

export default function ScheduleItem({
                                         title,
                                         time,
                                         color,
                                         link,
                                         verseIndex,
                                         className,
                                         ...rest
                                     }) {
    const bgColor = {
        white: "white",
        yellow: "#FFE9C6",
        red: "#FFC6C7",
        green: "#C6FFCC",
        purple: "#F4C6FF",
        blue: "#C6F2FF",
        gray: "#E8E8E8",
        lilac: "#EAD1DC"
    }

    // 1. Безопасно получаем данные стиха
    // Если verseIndex нет или стиха с таким индексом нет в массиве, будет undefined
    const currentVerse = (verseIndex !== undefined && verseIndex !== null) 
        ? Verses?.[verseIndex] 
        : null;

    const [isOpen, setIsOpen] = useState(false);
    
    // 2. Логика спойлера: это спойлер, ТОЛЬКО если передан индекс
    const isSpoiler = verseIndex !== undefined && verseIndex !== null;

    const toggleSpoiler = () => {
        if (isSpoiler) {
            setIsOpen(!isOpen);
        }
    };

    const Wrapper = isSpoiler ? "button" : "div";

    return (
        <div {...rest} className={clsx(className, "border border-black rounded-2xl overflow-hidden transition-all duration-300")} style={{ backgroundColor: bgColor[color] }}>
            <Wrapper
                onClick={toggleSpoiler}
                className="w-full flex items-center gap-4 p-1 pl-3 text-left min-h-12"
            >
                <div className="font-mono text-gray-500 text-lg">{time}</div>
                <div className="flex-auto font-medium text-xl">{title}</div>

                {isSpoiler ? (
                    <div className={clsx("border border-black rounded-xl p-2")}>
                        <ChevronRight className={clsx(
                            "transform transition-transform duration-300",
                            isOpen && "rotate-90"
                        )}/>
                    </div>
                ) : link ? (
                    <Link to={link} className="border border-black rounded-xl p-2">
                        <ArrowRight/>
                    </Link>
                ) : (
                    <div className=""></div>
                )}
            </Wrapper>

            {isSpoiler && (
                <div
                    className={clsx(
                        "transition-all duration-300 overflow-hidden px-3",
                        isOpen ? "max-h-96 py-3 border-t border-black" : "max-h-0 py-0 border-none"
                    )}
                >
                    {/* 3. ГЛАВНОЕ ИСПРАВЛЕНИЕ: Проверяем, существует ли currentVerse перед рендером */}
                    {currentVerse ? (
                        <>
                            <div className="font-semibold">{currentVerse.link || "Ссылка отсутствует"}</div>
                            <div className="text-lg">
                                {/* Доп. защита для функции форматирования */}
                                {currentVerse.content ? formatVerse(currentVerse.content) : "Текст отсутствует"}
                            </div>
                        </>
                    ) : (
                        <div className="text-red-500 py-2">
                            Ошибка: Стих #{verseIndex} не найден в базе данных!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}