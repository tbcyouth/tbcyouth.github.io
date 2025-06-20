import { useState, useEffect } from "react";
import { FilePlus2, Trash2, Pencil, Save, XCircle } from "lucide-react";
import { Textarea } from "../index";
import Swal from "sweetalert2";
import ReactMarkdown from "react-markdown";
import '../../styles/notes.css';

export default function Notes({ storageKey = "myNotes" }) {
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Ошибка чтения заметок из localStorage:", e);
            return [];
        }
    });

    const [text, setText] = useState("");
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(notes));
    }, [notes, storageKey]);

    const addNote = () => {
        if (text.trim() === "") return;
        const newNote = { id: Date.now(), text, isEditing: false };
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

    const startEditing = (id, currentText) => {
        setEditingNoteId(id);
        setEditingText(currentText);
    };

    const cancelEditing = () => {
        setEditingNoteId(null);
        setEditingText("");
    };

    const saveEditedNote = () => {
        setNotes(notes.map(note =>
            note.id === editingNoteId ? { ...note, text: editingText } : note
        ));
        setEditingNoteId(null);
        setEditingText("");
    };

    return (
        <div className="my-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold mb-2">Заметки:</h2>
                <a href="https://commonmark.org/help/" className="text-xl px-2 rounded-full border border-black">?</a>
            </div>

            <div className="mb-4 flex gap-2 items-start">
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label="Напиши свою заметку..."
                />
                <button
                    onClick={addNote}
                    className="border border-black rounded-xl p-2"
                    title="Добавить"
                >
                    <FilePlus2 className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="p-2 border border-gray-300 rounded-xl shadow-sm"
                    >
                        {editingNoteId === note.id ? (
                            <div className="space-y-2">
                                <Textarea
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <button
                                        onClick={saveEditedNote}
                                        className="border border-green-500 p-2 rounded-md text-green-700 hover:bg-green-100"
                                        title="Сохранить"
                                    >
                                        <Save className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={cancelEditing}
                                        className="border border-gray-500 p-2 rounded-md text-gray-500 hover:bg-gray-100"
                                        title="Отменить"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-start gap-2">
                                <div className="prose prose-sm max-w-none markdown-body px-2 flex-1">
                                    <ReactMarkdown>{note.text}</ReactMarkdown>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <button
                                        onClick={() => startEditing(note.id, note.text)}
                                        className="border border-blue-500 p-2 rounded-md text-blue-500 hover:text-blue-700"
                                        title="Редактировать"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => deleteNote(note.id)}
                                        className="border border-red-500 p-2 rounded-md text-red-500 hover:text-red-700"
                                        title="Удалить"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <p className="text-gray-500 my-2">
                (Все заметки строго хранятся на вашем устройстве, никто кроме вас не имеет к ним доступа)
            </p>
        </div>
    );
}
