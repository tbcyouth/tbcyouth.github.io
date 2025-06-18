import { useState, useEffect } from "react";
import {FilePlus2, Trash2} from "lucide-react";
import {Textarea} from "../index";
import Swal from "sweetalert2";

export default function Notes() {
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem("myNotes");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Ошибка чтения заметок из localStorage:", e);
            return [];
        }
    });

    const [text, setText] = useState("");

    // Сохраняем в localStorage каждый раз при изменении
    useEffect(() => {
        localStorage.setItem("myNotes", JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (text.trim() === "") return;
        const newNote = { id: Date.now(), text };
        setNotes([newNote, ...notes]);
        setText("");
    };

    const deleteNote = (id) => {
        Swal.fire({
            title: "Вы уверены?",
            text: "Вы действительно хотите удалить эту заметку?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#909090",
            confirmButtonText: "Да",
            cancelButtonText: "Нет",
        }).then((result) => {
            if (result.isConfirmed) {
                const updated = notes.filter(note => note.id !== id);
                setNotes(updated);

                Swal.fire({
                    title: "Успешно!",
                    text: "Вы успешно удалили заметку.",
                    confirmButtonText: "Хорошо",
                    confirmButtonColor: "#000",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="my-6">
            <h2 className="text-2xl font-bold mb-2">Заметки:</h2>

            <div className="mb-4 flex gap-2 items-start">
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label="Напиши свою заметку..."

                />
                <button
                    onClick={addNote}
                    className="border border-black rounded-xl p-2"
                >
                    <FilePlus2 className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="p-2 border border-gray-300 rounded-xl shadow-sm flex justify-between items-start"
                    >
                        <div className="whitespace-pre-wrap px-2">{note.text}</div>
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="border border-red-500 p-2 rounded-md text-red-500 hover:text-red-700"
                            title="Удалить"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
            <p className="text-gray-500 my-2">(Все заметки строго хранятся на вашем устройстве, никто кроме вас не имеет к ним доступа)</p>

        </div>
    );
}
