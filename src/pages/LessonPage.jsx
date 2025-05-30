import { useParams } from 'react-router-dom';
import {Lessons} from "../data";
import { useState } from "react";
import {formatVerse} from "../utils/index";
import {ReturnToSchedule, TranslateSwitcher} from "../components";

export default function QuietTimePage() {
    const { lessonId } = useParams();
    const data = Lessons[lessonId];

    const [isNewTranslate, setIsNewTranslate] = useState(() => localStorage.getItem("isNewTranslate") === "true");

    if (!data) {
        return <div>Урок не найден</div>;
    }

    return (
        <div>
            <div className="container">
                <ReturnToSchedule/>

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p>Урок #{data.id}</p>
                        <h2 className="text-3xl font-bold">{data.title}</h2>
                    </div>
                    <TranslateSwitcher setIsNewTranslate={setIsNewTranslate} isNewTranslate={isNewTranslate}/>
                </div>

                {data.content.map((item, index) => (
                    <div>
                        {item.type === "verse" && <div>{formatVerse(!!isNewTranslate ? item.new : item.old)}</div>}
                        {item.type === "img" && <img alt={data.title} src={item.url} className="mx-auto max-w-full" />}
                        {item.type === "text" &&  <div>{item.text}</div>}
                    </div>
                ))}

                {/*{data.content.map((item, index) => (*/}
                {/*    <div>*/}
                {/*        {item.type === "img" && <img src={item.url} />}*/}
                {/*        {item.type === "verse" && <div>{formatVerse(item.text)}</div>}*/}
                {/*    </div>*/}
                {/*))}*/}

                {/*{isNewTranslate ? (*/}
                {/*    <div>*/}
                {/*        {formatVerse(data.new)}*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div>*/}
                {/*        {formatVerse(data.old)}*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </div>
    );
}
