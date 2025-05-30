import { useParams } from 'react-router-dom';
import {Notes, PairRound, ReturnToSchedule} from "../components";
import {useState} from "react";
import {Repeat} from "lucide-react";

export default function QuietTimePage() {
    const { pairId } = useParams();

    const saved = localStorage.getItem("authGroup");
    const group = saved ? JSON.parse(saved) : null;

    const questions = [
        "First question that what type of homemade food you like when you was a child and spent your time with your family?",
        "Second question is that how many family members you have?",
    ]

    const [questionId, setQuestionId] = useState(0);

    if (!group) {
        return <div>не найден</div>;
    }

    function randomNumber() {
        return Math.floor(Math.random() * questions.length);
    }

    return (
        <div>
            <div className="container">
                <ReturnToSchedule/>
                <h3 className="mb-2 font-bold text-2xl">Пары:</h3>
                <PairRound groupId={group.id} roundId={pairId}/>
                <h3 className="mt-4 mb-2 font-bold text-2xl">Вопросы:</h3>
                <div className="flex items-start gap-2">
                    <div className="w-full px-4 p-2 border border-black rounded-xl">{questions[questionId] || "Обнови"}</div>
                    <button className="p-2 border border-black rounded-xl" onClick={() => setQuestionId(randomNumber)}><Repeat/></button>
                </div>
                <Notes/>
            </div>
        </div>
    );
}
