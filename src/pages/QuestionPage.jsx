import { useState } from "react";
import Swal from "sweetalert2";
import { Textarea } from "../components";
import { sendMessage } from "../utils";

export default function QuestionPage() {
    const [msg, setMsg] = useState('');
    // Используем просто переменную для имени, чтобы не менять стейт лишний раз
    const [nmState, setNmState] = useState(''); 

    const handleSubmit = () => {
        if (!msg.trim()) {
            Swal.fire("Ошибка", "Пожалуйста, введите вопрос", "error");
            return;
        }

        // Логика имени: если пусто, ставим "Аноним"
        const finalName = nmState.trim() ? nmState : "Аноним";

        const message = `
<b>❓ АНОНИМНЫЙ ВОПРОС</b>

<b>От:</b> ${finalName}
<b>Вопрос:</b> 
${msg}
        `;

        Swal.fire({
            title: "Отправить вопрос?",
            text: "Лидеры увидят его анонимно (если вы не указали имя)",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Да, отправить",
            cancelButtonText: "Нет",
            confirmButtonColor: "#000",
        }).then((res) => {
            if (res.isConfirmed) {
                // Показываем крутилку загрузки
                Swal.showLoading();

                // Отправляем и ЖДЕМ результат
                sendMessage(message)
                    .then(() => {
                        // Если всё ок
                        setMsg("");
                        setNmState(""); // Очищаем поля
                        
                        Swal.fire({
                            title: "Успешно!",
                            text: "Ваш вопрос был отправлен!",
                            confirmButtonText: "Круто",
                            confirmButtonColor: "#000",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        // Если ошибка
                        console.error("ОШИБКА ОТПРАВКИ:", error);
                        Swal.fire({
                            title: "Ошибка!",
                            text: "Не удалось отправить. Проверьте консоль (F12) или интернет.",
                            icon: "error",
                            confirmButtonColor: "#000"
                        });
                    });
            }
        });
    };

    return (
        <div className="container max-w-xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Задать вопрос</h1>
            <p className="mb-6 text-gray-600">Здесь можно задать любой вопрос лидерам. Можно анонимно.</p>
            
            <div className="mb-4">
                <h5 className="font-medium mb-2">Ваше имя (не обязательно)</h5>
                <Textarea
                    label="Имя"
                    value={nmState}
                    onChange={(e) => setNmState(e.target.value)}
                    id="nm"
                    name="nm"
                />
            </div>
            
            <div className="mb-6">
                <h5 className="font-medium mb-2">Ваш вопрос</h5>
                <Textarea
                    label="Напишите вопрос здесь..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    id="question"
                    name="question"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="w-full bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-bold text-lg"
            >
                Отправить вопрос
            </button>
        </div>
    );
}