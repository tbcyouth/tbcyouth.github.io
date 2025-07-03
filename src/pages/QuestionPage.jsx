import { useState } from "react";
import Swal from "sweetalert2";
import { Textarea } from "../components";
import { sendMessage } from "../utils";

export default function QuestionPage() {
    const [msg, setMsg] = useState('');
    let [nm, setNm] = useState('');

    const handleSubmit = () => {
        if (!msg) {
            Swal.fire("Ошибка", "Пожалуйста, введите вопрос", "error");
            return;
        }
        if (!nm) {
            nm = "Не указано :(";
        }

        const message = `
<b>АНОНИМНЫЙ ВОПРОС</b>
<b></b>
<b>Имя: </b> ${nm}
<b></b> 
<b>Вопрос:</b> 
${msg}
        `;

        Swal.fire({
            title: "Отправить данные?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Да",
            cancelButtonText: "Нет",
            confirmButtonColor: "#000",
        }).then((res) => {
            if (res.isConfirmed) {
                sendMessage(message);
                setMsg("");
                setNm("");

            Swal.fire({
                title: "Успешно!",
                text: "Ваш вопрос был отправлен!",
                confirmButtonText: "Хорошо",
                confirmButtonColor: "#000",
                icon: "success"
            });
        }});
    };

    return (
        <div className="container max-w-xl mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Вопросы:</h1>
            <div className="mb-2">
                <Textarea
                    label="Имя (по желанию)"
                    value={nm}
                    onChange={(e) => setNm(e.target.value)}
                    id="nm"
                    name="nm"
                />
            </div>
            <div className="mb-4">
                <Textarea
                    label="Ваш вопрос"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    id="question"
                    name="question"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition"
            >
                Отправить
            </button>
        </div>
    );
}
