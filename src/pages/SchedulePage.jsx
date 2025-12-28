import { Link, useParams } from 'react-router-dom';
import { CalendarCheck2, ChevronLeft, ChevronRight } from "lucide-react";
import { ScheduleItem } from "../components";
import { Schedule } from "../data";
import { isAdmin } from "../utils";

// 1. Исправляем дату начала (11 = Декабрь)
// Используем timestamp для точного расчета разницы дней
const START_DATE = new Date(2025, 11, 27); // 27 Декабря 2025

const getDayDiff = () => {
    const now = new Date();
    const start = new Date(START_DATE);
    // Сбрасываем часы, чтобы считать полные дни
    now.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    
    const diffTime = now.getTime() - start.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export default function SchedulePage() {
    const { dayPosition } = useParams();
    // Защита: если dayPosition нет, считаем 0. Преобразуем в число.
    const offset = parseInt(dayPosition) || 0;
    
    // Получаем корректный индекс
    const currentDayDiff = getDayDiff();
    const activeIndex = currentDayDiff + offset;
    
    // Безопасно берем день
    const day = Schedule[activeIndex];
    const admin = isAdmin();

    // Проверки для стрелок навигации
    const hasPrev = activeIndex > 0;
    // Проверка, чтобы не уйти дальше, чем есть данных в массиве
    const hasNext = activeIndex < Schedule.length - 1;

    return (
        <div className="container mx-auto px-4 pb-20"> {/* Добавил отступы */}
            <div className="flex justify-between items-center mb-6 mt-6">
                
                {/* Левая кнопка */}
                {hasPrev ? (
                    <Link to={`/schedule/${offset - 1}`} className="block border border-black rounded-xl p-2 active:scale-95 transition">
                        <ChevronLeft />
                    </Link>
                ) : (
                    <div className="block border border-gray-300 text-gray-300 rounded-xl p-2 cursor-not-allowed">
                        <ChevronLeft />
                    </div>
                )}

                {/* Центр */}
                <div className="flex flex-col items-center">
                    {offset === 0 ? (
                        <div className="text-green-600 font-medium">Сегодня</div>
                    ) : offset > 0 ? (
                        <div className="text-blue-500 font-medium">Скоро будет</div>
                    ) : (
                        <div className="text-gray-400 font-medium">Уже прошел</div>
                    )}
                    <div className="text-2xl font-bold">День #{activeIndex + 1}</div>
                </div>

                {/* Правая кнопка */}
                {hasNext ? (
                    <Link to={`/schedule/${offset + 1}`} className="block border border-black rounded-xl p-2 active:scale-95 transition">
                        <ChevronRight />
                    </Link>
                ) : (
                    <div className="block border border-gray-300 text-gray-300 rounded-xl p-2 cursor-not-allowed">
                        <ChevronRight />
                    </div>
                )}
            </div>

            <div className="relative min-h-[300px]">
                <div className="">
                    {/* ГЛАВНОЕ ИСПРАВЛЕНИЕ: Array.isArray(day)
                        Это предотвращает белый экран, если day = undefined или сломан
                    */}
                    {Array.isArray(day) && day.length > 0 ? (
                        day.map((item, i) => (
                            <ScheduleItem
                                key={i}
                                time={item.time || "--:--"}
                                title={item.title || "Без названия"}
                                link={item.link || undefined} // Убрал || "", React сам игнорирует undefined
                                verseIndex={item.verseIndex}
                                color={item.color || "white"}
                                className="mb-2"
                            />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500 border-2 border-dashed border-gray-200 rounded-xl">
                            <div>На этот день нет расписания</div>
                            <div className="text-sm mt-2 opacity-50">(Или данные загружаются...)</div>
                        </div>
                    )}
                </div>

                {/* Блюр для будущих дней */}
                {offset > 0 && !admin && (
                    <div className="absolute -top-5 -left-5 -right-5 -bottom-5 backdrop-blur-[10px] z-10 flex items-center justify-center">
                         <div className="bg-white/80 px-4 py-2 rounded-lg shadow-lg font-bold text-gray-500">
                             Спойлеры запрещены 🤫
                         </div>
                    </div>
                )}

                {/* Галочка для прошедших дней */}
                {offset < 0 && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
                        <div className="absolute inset-0 bg-green-100/20 blur-[10px]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500/40">
                            <CalendarCheck2 strokeWidth={1} size={200} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}