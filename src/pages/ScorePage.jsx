import { useState } from 'react';
import { Input, Textarea } from "../components";
import { sendMessage } from "../utils";
import Swal from "sweetalert2";
import { Groups } from "../data/";

const categories = ["Инициативность", "Дисциплина", "Креативность"];

export default function ScorePage() {
    const saved = localStorage.getItem("authGroup");
    const groupData = saved ? JSON.parse(saved) : null;

    const [writer, setWriter] = useState('');
    const [targetGroup, setTargetGroup] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Инициативность'); // ← по умолчанию

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

<b>Что сделал?</b> 
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
                sendMessage(message).then(() => {
                    Swal.fire("Успешно!", "Сообщение отправлено!", "success");
                    setWriter('');
                    setTargetGroup('');
                    setDescription('');
                    setCategory('Инициативность');
                });
            }
        });
    };

    const otherGroups = Groups.filter(group => group.name !== groupData?.name);

    return (
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
                <h5 className="font-medium mb-2">Что сделал участник?</h5>
                <Textarea
                    label="Опишите действие"
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
    );
}
