import { useState } from "react";
import Swal from "sweetalert2";
import { Input, Textarea } from "../components";
import {getAuthGroup, sendMessage} from "../utils";

export default function QuestionPage() {
    const [msg, setMsg] = useState('');
    const auth = getAuthGroup();

    const handleSubmit = () => {
        if (!msg) {
            Swal.fire("Ошибка", "Пожалуйста, введите вопрос", "error");
            return;
        }

        const message = `
<b>АНОНИМНЫЙ ВОПРОС</b>
<b>Группа: </b> ${auth.name}
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
                sendMessage(message)
                setMsg("")

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
        <div className="container">
            <h1 className="text-2xl font-bold mb-4">Вопросы:</h1>
            <div className="mb-4">
            <Textarea
                    label=""
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    id="description"
                    name="description"
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
