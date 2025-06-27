import { useState } from 'react';
import { Input, Textarea } from "../components";
import {getAuthGroup, sendMessage} from "../utils";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const questions = [
    "Возраст",
    "Телефон",
    "Телеграм",
    "Какие были ожидания от семинара?",
    "Общие впечатления о семинаре?",
    "Что вам запомнилось больше всего?",
    "Что понравилось больше всего?",
    "Что не понравилось совсем?",
    "Что можно улучшить в следующем семинаре?",
    "Что вы переосмыслили?",
    "Что изменится в вашей жизни после этого семинара?",
    "Какие решения вы приняли на этом семинаре?",
];

export default function FeedbackPage() {
    const [username, setUsername] = useState('');
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));

    const groupData = getAuthGroup();

    const navigate = useNavigate();

    const handleTextareaChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        if (!username.trim()) {
            return Swal.fire({
                title: "Поле обязательно!",
                text: "Пожалуйста, укажите ваше ФИО.",
                icon: "error",
                confirmButtonColor: "#000",
            });
        }

        const emptyIndex = answers.findIndex(answer => !answer.trim());
        if (emptyIndex !== -1) {
            return Swal.fire({
                title: "Поле обязательно!",
                text: `Пожалуйста, ответьте на вопрос: "${questions[emptyIndex]}"`,
                icon: "error",
                confirmButtonColor: "#000",
            });
        }

        let message = `<b>ОТЗЫВ О СЕМИНАРЕ</b>\n`;
        message += `<b>Группа:</b> ${groupData?.name || "—"}\n`;
        message += `<b>ФИО:</b> ${username}\n\n`;

        questions.forEach((question, index) => {
            message += `<b>${question}</b>\n${answers[index]}\n\n`;
        });

        Swal.fire({
            title: "Все проверили?",
            text: "Вы готовы отправить отзыв?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#909090",
            confirmButtonText: "Да",
            cancelButtonText: "Нет",
        }).then((result) => {
            if (result.isConfirmed) {
                sendMessage(message)
                    .then(() => {
                        navigate(-1);
                        Swal.fire({
                            title: "Успешно!",
                            text: "Вы успешно отправили отзыв!",
                            confirmButtonText: "Хорошо",
                            confirmButtonColor: "#000",
                            icon: "success"
                        });
                    });
            }
        });
        message += `#${groupData?.name.replace(/\s+/g, '_').toLowerCase() || "—"}`
    };

    return (
        <div className="container max-w-xl mx-auto py-6">
            <h1 className="text-2xl font-bold">Понравился семинар?</h1>
            <p className="mb-6">Напиши отзыв о данном семинаре!</p>

            <div className="mb-6">
                <h5 className="font-medium mb-2">Ваше ФИО</h5>
                <Input
                    label="ФИО"
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
