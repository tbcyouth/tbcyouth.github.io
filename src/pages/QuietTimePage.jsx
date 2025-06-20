import { useParams } from 'react-router-dom';
import { QuietTime } from "../data";
import { useState } from "react";
import {formatVerse} from "../utils/index";
import {ReturnToSchedule, TranslateSwitcher} from "../components";

export default function QuietTimePage() {
    const { quietTimeId } = useParams();
    const data = QuietTime[quietTimeId];

    const [isNewTranslate, setIsNewTranslate] = useState(() => localStorage.getItem("isNewTranslate") === "true");

    if (!data) {
        return <div>Тихое время не найдено</div>;
    }

    return (
        <div>
            <div className="container">
                <ReturnToSchedule/>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{data.title}</h2>
                    <TranslateSwitcher setIsNewTranslate={setIsNewTranslate} isNewTranslate={isNewTranslate}/>
                </div>

                {isNewTranslate ? (
                    <div className="text-xl">
                        {formatVerse(data.new)}
                    </div>
                ) : (
                    <div className="text-xl">
                        {formatVerse(data.old)}
                    </div>
                )}
            </div>
        </div>
    );
}
