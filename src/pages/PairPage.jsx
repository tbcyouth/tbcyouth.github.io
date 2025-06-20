import { useParams } from 'react-router-dom';
import {Notes, PairRound, ReturnToSchedule} from "../components";
import {useState} from "react";
import {Repeat} from "lucide-react";

export default function QuietTimePage() {
    const { pairId } = useParams();

    const saved = localStorage.getItem("authGroup");
    const group = saved ? JSON.parse(saved) : null;

    const questions = [
        "Как ты реально себя чувствуешь сейчас, если отбросить стандартные ответы?",
        "В чём ты больше всего нуждаешься от Бога на этой неделе?",
        "Есть ли что-то, что ты боишься рассказать другим, но хочешь доверить Богу?",
        "Как ты чувствуешь себя в своей вере в последнее время — растёт ли она или остывает?",
        "Была ли ситуация на этой неделе, где тебе трудно было поступить по-христиански?",
        "Как ты справляешься с сомнениями или трудными вопросами о Боге?",
        "Есть ли у тебя мечта, о которой ты редко говоришь, но она жива в твоём сердце?",
        "Какая молитва у тебя давно без ответа, и как ты это переживаешь?",
        "Чувствуешь ли ты себя в чём-то одиноким? В чём именно?",
        "Что последнее тебя сильно вдохновило в Библии?",
        "Есть ли в тебе сейчас что-то, за что тебе стыдно или тяжело на сердце?",
        "Как ты видишь свою роль в теле Христа (в церкви, в служении)?",
        "Какие внутренние битвы ты сейчас ведёшь?",
        "Как ты на самом деле воспринимаешь Божью любовь к себе?",
        "В чём тебе нужно прощение — от Бога, от других или от себя?",
        "Кто или что сейчас больше всего влияет на твою духовную жизнь?",
        "Есть ли у тебя неразрешённый конфликт или боль, которую ты носишь?",
        "Что ты хотел бы, чтобы Бог изменил в тебе прямо сейчас?",
        "Кем ты хочешь быть в Божьих глазах через 5 лет?",
        "Как я могу молиться за тебя на этой неделе, чтобы ты реально это почувствовал?"
    ];

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
                <Notes storageKey={`notes_pair_${pairId}`}/>
            </div>
        </div>
    );
}
