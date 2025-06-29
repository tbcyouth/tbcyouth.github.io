import { useState } from 'react';
import { Input, Textarea } from "../components";
import {getAuthGroup, sendMessage} from "../utils";
import Swal from "sweetalert2";
import { Groups } from "../data/";

const categories = ["Инициативность", "Дисциплина", "Креативность"];

export default function ScorePage() {
    const groupData = getAuthGroup();

    const [writer, setWriter] = useState('');
    const [targetGroup, setTargetGroup] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Инициативность'); // ← по умолчанию
    const [isLoading, setIsLoading] = useState(false);
    const GOOGLE_APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz8K7QqzVL28c0acmqlu5Z-_VX4GPOtJy1o2HBGl0slC_k7GlTZFgeFkZrmep7Ch6oQPA/exec";

    const handleSubmit = () => {
        if (!writer || !targetGroup || !description || !category) {
            Swal.fire("Ошибка", "Пожалуйста, заполните все поля", "error");
            return;
        }

        const message = `
<b>💬 ОЦЕНКА</b>

<b>От кого:</b> ${groupData.name}
<b>Кто пишет:</b> ${writer}
<b>Про кого:</b> ${targetGroup}
<b>Категория:</b> ${category}

<b>Кто и что сделал?</b> 
${description}

#оценка_день_${new Date().getDate()}
#оценка_${category.replace(/\s+/g, '').toLowerCase()}_${new Date().getDate()}
#оценка_${targetGroup.replace(/\s+/g, '').toLowerCase()}_${new Date().getDate()}
#оценка_${category.replace(/\s+/g, '').toLowerCase()}_${targetGroup.replace(/\s+/g, '').toLowerCase()}_${new Date().getDate()}
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
                setIsLoading(true);

                const payload = {
                    writer: writer,
                    targetGroup: targetGroup,
                    description: description,
                    category: category,
                    date: new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear(),
                };
    
                // Отправляем POST-запрос на URL нашего Google Apps Script
                fetch(GOOGLE_APP_SCRIPT_URL, {
                    method: 'POST',
                    // ВАЖНО: Apps Script требует особого формата для POST, поэтому обходной путь с redirect и text/plain
                    mode: 'no-cors', // Для обхода некоторых CORS-ограничений при простом POST
                    redirect: 'follow',
                    headers: {
                        // Content-Type убираем, так как Apps Script будет ругаться на 'application/json' с CORS
                    },
                    body: JSON.stringify(payload),
                })
                .then(() => {
                    const now_date = new Date().getDate();
                    // ВАЖНО: т.к. мы используем обходной путь, мы не можем прочитать ответ от сервера.
                    // Мы просто будем считать, что если ошибки не произошло, то все успешно.
                    if (localStorage.getItem(`amountOfVotes-${now_date}`) !== null) {
                        localStorage.setItem(`amountOfVotes-${now_date}`, Number(localStorage.getItem(`amountOfVotes-${now_date}`)) + 1);
                    } else {
                        localStorage.setItem(`amountOfVotes-${now_date}`, 1);
                    }
                    Swal.fire("Успешно!", "Ваш голос был отправлен на обработку!", "success");
                    
                    // Сбрасываем поля формы
                    setWriter('');
                    setTargetGroup('');
                    setDescription('');
                    setCategory('Инициативность');
                })
                .catch(error => {
                    console.error("Ошибка при отправке очка:", error);
                    Swal.fire("Ошибка!", "Не удалось отправить ваш голос.", "error");
                })
                .finally(() => {
                    setIsLoading(false);
                });
            }
        });
    };

    const otherGroups = Groups.filter(group => group.name !== groupData?.name);

    return (
        localStorage.getItem(`amountOfVotes-${new Date().getDate()}`) >= 3 ? 
            (<div className="container text-3xl mx-auto py-6 text-center">
               Вы проголосовали максимальное количество раз за сегодня
            </div>
            ) : (
            <div className="container max-w-xl mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Очки группы</h1>

            {/* Фейковый input — отображение своей группы */}
            <div className="mb-6">
                <h5 className="font-medium mb-2">Группа, от которой отправляется:</h5>
                <input
                    type="text"
                    value={groupData?.name || "Не определено"}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 rounded-xl cursor-not-allowed"
                />
            </div>

            <div className="mb-6">
                <h5 className="font-medium mb-2">Кто пишет?</h5>
                <Input
                    label="Ваше имя"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                    id="writer"
                    name="writer"
                />
            </div>

            <div className="mb-6">
                <h5 className="font-medium mb-2">О какой группе?</h5>
                <select
                    value={targetGroup}
                    onChange={(e) => setTargetGroup(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                >
                    <option value="">Выберите группу</option>
                    {otherGroups.map((group, index) => (
                        <option key={index} value={group.name}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <h5 className="font-medium mb-2">Категория оценки</h5>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl"
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <h5 className="font-medium mb-2">Кто и что сделал?</h5>
                <Textarea
                    label="Ваня, помог нам убрать со стола <3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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
        )
    );
}
