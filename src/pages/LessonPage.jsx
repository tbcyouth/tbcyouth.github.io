import { useParams } from 'react-router-dom';
import {Lessons} from "../data";
import { useState } from "react";
import {formatVerse, isAdmin} from "../utils/index";
import {ReturnToSchedule, TranslateSwitcher} from "../components";
import ReactMarkdown from "react-markdown";
import '../styles/notes.css';


export default function QuietTimePage() {
    const { lessonId } = useParams();
    const data = Lessons[lessonId];
    const admin = isAdmin()

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
                    <div className="mb-4 text-lg">
                        {item.type === "verse" 
                            ?
                                (admin === !item.isOpen &&
                                    <div className="markdown-body">
                                        <blockquote>
                                            &laquo;{formatVerse(!!isNewTranslate ? item.new : item.old)}&raquo;
                                            <div className="font-medium">– {item.title}</div>
                                        </blockquote>
                                    </div>
                                )
                            ||
                                (item.isOpen &&
                                    <div className="markdown-body bg-green-300/30">
                                        <blockquote>
                                            &laquo;{formatVerse(!!isNewTranslate ? item.new : item.old)}&raquo;
                                            <div className="font-medium">– {item.title}</div>
                                        </blockquote>
                                    </div>
                                )
                            :
                        item.type === "img" 
                            ?
                                (admin === !item.isOpen && <img alt={data.title} src={item.url} className="mx-auto max-w-full" />) || (item.isOpen && <img alt={data.title} src={item.url} className="mx-auto max-w-full" />)
                            :
                        item.type === "text"
                            ?
                            (admin === !item.isOpen &&
                                item.text.split('\n').map((line, idx) => (
                                    <div className="mb-4 markdown-body"><ReactMarkdown key={idx}>{line}</ReactMarkdown></div>
                                )))
                            ||
                                (item.isOpen
                            &&
                            item.text.split('\n').map((line, idx) => (
                                <div className="mb-4 bg-green-300/30 markdown-body"><ReactMarkdown key={idx}>{line}</ReactMarkdown></div>
                            )))
                            :
                            <div></div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
