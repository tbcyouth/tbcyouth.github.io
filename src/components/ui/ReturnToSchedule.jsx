import {ArrowLeft} from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function ReturnToSchedule() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="flex w-full mb-4 rounded-xl p-2 items-center text-xl border-2 border-gray-400 text-black"
        >
            <ArrowLeft className=""/>
            <div className="pl-2 ml-2 border-l-2 border-gray-300 text-gray-500">Назад</div>
        </button>
    )
}