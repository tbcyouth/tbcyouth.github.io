import { useState } from 'react';
import { Input, Textarea } from "../components";
import {sendMessage} from "../utils";


// Массив вопросов
const questions = [
    "Какие были ожидания от семинара?",
    "Что больше всего запомнилось?",
    "Что можно улучшить в следующем семинаре?",
];

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));


    const saved = localStorage.getItem("authGroup");
    const groupData = saved ? JSON.parse(saved) : null;

    const handleTextareaChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        let message = `<b>ОТЗЫВ О СЕМИНАРЕ</b>\n`;
        message += `<b>Группа:</b> ${groupData.name}\n`;
        message += `<b>Имя:</b> ${username}\n\n`;

        questions.forEach((question, index) => {
            message += `<b>${question}</b>\n${answers[index] || '-'}\n\n`;
        });

        sendMessage(message).then(r => alert("Отправлено!"));

    };

    return (
        <div className="container max-w-xl mx-auto py-6">
            <h1 className="text-2xl font-bold">Понравился семинар?</h1>
            <p className="mb-6">Напиши отзыв о данном семинаре!</p>

            <div className="mb-6">
                <h5 className="font-medium mb-2">Ваше имя</h5>
                <Input
                    label="Ваше имя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    name="username"
                />
            </div>

            {questions.map((question, index) => (
                <div className="mb-6" key={index}>
                    <h5 className="font-medium mb-2">{question}</h5>
                    <Textarea
                        label="Ваш ответ"
                        value={answers[index]}
                        onChange={(e) => handleTextareaChange(index, e.target.value)}
                        id={`textarea-${index}`}
                        name={`textarea-${index}`}
                    />
                </div>
            ))}

            <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
            >
                Отправить отзыв
            </button>
        </div>
    );
}
