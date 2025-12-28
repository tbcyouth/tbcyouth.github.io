import {Link, useParams} from 'react-router-dom';
import {CalendarCheck2, ChevronLeft, ChevronRight} from "lucide-react";
import {ScheduleItem} from "../components";
import {Schedule} from "../data";
import {getDayOfYear, isAdmin} from "../utils";

const days = Schedule;

const firstDay = getDayOfYear(new Date(2025, 11, 27))
const today = getDayOfYear(new Date())

export default function SchedulePage() {
    const { dayPosition } = useParams();
    const day = days[today - firstDay + +dayPosition];
    const admin = isAdmin()

    // if (+dayPosition < 7) {
    //     return (
    //         <div className="container text-3xl mx-auto py-6 text-center mt-20">
    //             Семинар закончился, ждите следующего :)
    //         </div>
    //     );
    // }

    return (
        <div className="container">
            <div className="flex justify-between items-center mb-6">
                    {0 < today - firstDay + +dayPosition ? (
                        <Link to={`/schedule/${dayPosition - 1}`} className="block border border-black rounded-xl p-2">
                            <ChevronLeft/>
                        </Link>
                    ):(
                        <div className="block border border-gray-400 text-gray-400 rounded-xl p-2">
                            <ChevronLeft/>
                        </div>
                    )}
                <div className="flex flex-col items-center">
                    {
                        +dayPosition === 0 ? (
                            <div>Сегодня</div>
                        ) : +dayPosition > 0 ? (
                            <div>Скоро будет</div>
                        ) : +dayPosition < 0 ? (
                            <div>Уже прошел</div>
                        ) : (
                            <div>-</div>
                        )
                    }
                    <div className="text-3xl font-bold">День #{today - firstDay + +dayPosition + 1}</div>
                </div>
                    {days.length - 1 > today - firstDay + +dayPosition ? (
                        <Link to={`/schedule/${+dayPosition + 1}`} className="block border border-black rounded-xl p-2">
                            <ChevronRight/>
                        </Link>
                    ): (
                        <div className="block border border-gray-400 text-gray-400 rounded-xl p-2">
                            <ChevronRight/>
                        </div>
                    )}
            </div>
            <div className="relative ">
                <div className="">
                    {!!day ? day.map((item, i) => (
                        <ScheduleItem
                            key={i}
                            time={item.time || "--:--"}
                            title={item.title || "NO$#^@T1TLe"}
                            link={item.link || ""}
                            verseIndex={item.verseIndex}
                            color={item.color || "white"}
                            className="mb-2"
                        />
                    )):(
                        <div>На этот день нет расписания</div>
                    )}
                </div>
                {
                    +dayPosition === 0 ? (
                        <div></div>
                    ) : +dayPosition > 0 ? (
                        <>
                            {!admin && <div className="absolute -top-5 -left-5 -right-5 -bottom-5 backdrop-blur-[10px]"></div>}
                        </>
                    ) : +dayPosition < 0 ? (
                            <div className="pointer-events-none">
                                <div className="absolute -top-5 -left-5 -right-5 -bottom-5 bg-green-500/20 blur-[10px]"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 "><CalendarCheck2 strokeWidth={0.75} size="400"/></div>
                            </div>
                    ) : (
                        <div>-</div>
                    )
                }
            </div>
        </div>
    );
}
