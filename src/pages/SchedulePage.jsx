import {Link, useParams} from 'react-router-dom';
import {ChevronLeft, ChevronRight} from "lucide-react";
import {ScheduleItem} from "../components";
import {Schedule} from "../data";
import {getDayOfYear} from "../utils";

const days = Schedule;




const firstDay = getDayOfYear(new Date(2025, 5, 18))
const today = getDayOfYear(new Date())


export default function SchedulePage() {
    const { dayPosition } = useParams();
    const day = days[today - firstDay + +dayPosition];

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
                    {+dayPosition === 0 ? (
                        <div>Сегодня</div>
                    ) : +dayPosition > 0 ? (
                        <div>Скоро будет</div>
                    ) : +dayPosition < 0 ? (
                        <div>Уже прошел</div>
                    ) : (
                        <div>-</div>
                    )}
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
        </div>
    );
}
