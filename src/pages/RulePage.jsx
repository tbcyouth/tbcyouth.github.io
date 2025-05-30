import { CheckCircle } from "lucide-react"; // Иконка галочки

const rules = [
    "Не опаздывать и соблюдать расписание",
    "Быть активным на внутригрупповых занятиях",
    "Принимать участие во всех мероприятиях семинара",
    "Не выходить за пределы территории без предупреждения (чтобы не было сумасшедших поисков на неизвестной территории)",
    "Слушаться лидера",
    "Проявлять уважение и любовь",
    "Соблюдать чистоту и порядок",
    "Убирать посуду и мыть за собой",
];

export default function RulePage() {
    return (
        <div className="container max-w-2xl mx-auto pt-6 pb-10">
            <h1 className="text-3xl font-bold mb-6 text-center">Правила семинара</h1>
            <ol className="space-y-4 list-decimal list-inside text-lg">
                {rules.map((rule, index) => (
                    <li
                        key={index}
                        className="bg-gray-100 p-4 rounded-xl shadow-sm flex items-start gap-3"
                    >
                        <CheckCircle className="flex-none w-6 h-6 text-green-600 mt-1" />
                        <span>{rule}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
