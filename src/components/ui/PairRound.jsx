import { Groups } from "../../data";

const algorithms = {
    6: [
        {
            0: 5,
            1: 2,
            3: 4,
        },
        {
            0: 3,
            1: 4,
            2: 5,
        },
        {
            0: 4,
            1: 5,
            3: 4,
        },
        {
            0: 1,
            2: 4,
            3: 5,
        },
        {
            0: 2,
            1: 3,
            4: 5,
        },
    ],
    8: [
        {
            0: 4,
            1: 5,
            2: 6,
            3: 7,
        },
        {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
        },
        {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
        },
    ],

};

export default function PairRound({ groupId, roundId }) {
    const members = Groups[groupId].members;
    const groupSize = members.length;
    const roundPairs = algorithms[groupSize]?.[roundId]; // получаем пары

    if (!roundPairs) {
        return <div>Нет данных для такого раунда или размера группы.</div>;
    }

    return (
        <div className="space-y-2">
            {Object.entries(roundPairs).map(([a, b]) => (
                <div key={a} className="grid grid-cols-3 gap-2 items-center justify-between rounded-xl border border-black px-4 py-2 text-xl">
                    <div className="justify-self-start font-medium">{members[a].name}</div>
                    <div className="justify-self-center">– и –</div>
                    <div className="justify-self-end font-medium">{members[b].name}</div>
                </div>
            ))}
        </div>
    );
}
