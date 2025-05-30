import { useState, useEffect } from "react";
import {FilePlus2, Trash2} from "lucide-react";
import {Textarea} from "../index";

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
        const updated = notes.filter(note => note.id !== id);
        setNotes(updated);
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
        </div>
    );
}
