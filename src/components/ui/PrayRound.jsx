import { Groups } from "../../data";
import {getAuthGroup} from "../../utils";

// 🔁 Новый формат: массив массивов пар [a, b], порядок сохраняется
const algorithms = {
    6: [
        [ [0, 5], [1, 2], [3, 4] ],
        [ [0, 3], [1, 4], [2, 5] ],
        [ [0, 4], [1, 5], [3, 4] ],
        [ [0, 1], [2, 4], [3, 5] ],
        [ [0, 2], [1, 3], [4, 5] ],
    ],
    8: [
        [ [0, 6], [1, 5], [2, 4], [3, 7] ],
        [ [0, 3], [1, 2], [4, 7], [5, 6] ],
        [ [0, 7], [1, 6], [2, 5], [3, 4] ],
        [ [0, 1], [2, 3], [4, 5], [6, 7] ],
        [ [0, 5], [1, 4], [2, 7], [3, 6] ],
        [ [0, 4], [1, 7], [2, 6], [3, 5] ],
        [ [0, 2], [1, 3], [4, 6], [5, 7] ],
    ],
    14: [
        [ [0, 6], [1, 5], [2, 4], [3, 10], [7, 13], [8, 12], [9, 11] ],
        [ [0, 3], [1, 2], [5, 6], [4, 11], [7, 10], [8, 9], [12, 13] ],
        [ [1, 6], [2, 5], [3, 4], [0, 7], [8, 13], [9, 12], [10, 11] ],
        [ [0, 1], [2, 3], [4, 5], [6, 13], [7, 8], [9, 10], [11, 12] ],
        [ [0, 5], [1, 4], [3, 6], [2, 9], [7, 12], [8, 11], [10, 13] ],
        [ [0, 4], [2, 6], [3, 5], [1, 8], [7, 11], [9, 13], [10, 12] ],
        [ [0, 2], [1, 3], [4, 6], [5, 12], [7, 9], [8, 10], [11, 13] ],
    ],
};

export default function PrayRound({ groupIds = [], roundId }) {
    const allMembers = groupIds.flatMap(id => Groups[id].members);
    const groupSize = allMembers.length;

    const roundIndex = Number(roundId);
    const roundPairs = algorithms[groupSize]?.[roundIndex];

    const group = getAuthGroup();

    if (!roundPairs) {
        return <div>Нет данных для такого раунда или размера группы. ({groupSize} участников, раунд {roundId})</div>;
    }

    return (
        <div className="space-y-2">
            {roundPairs.map(([a, b], index) => (
                <>
                    {/*{Math.floor(roundPairs.length / 2)} - {index} <p></p>*/}
                    {/*{Math.floor(roundPairs.length / 2) === index ? "yes" : "no"}*/}
                    {group.id === 0 &&
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-2 items-center justify-between rounded-xl border border-black px-4 py-2 text-xl"
                        >
                            <div className="justify-self-start font-medium">{allMembers[a]?.name || `#${a}`}</div>
                            <div className="justify-self-center">– и –</div>
                            <div className="justify-self-end font-medium">{allMembers[b]?.name || `#${b}`}</div>
                        </div>
                    }
                    {group.id === groupIds[0] && index <= Math.floor(roundPairs.length / 2) && group.id !== 0 &&
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-2 items-center justify-between rounded-xl border border-black px-4 py-2 text-xl"
                        >
                            <div className="justify-self-start font-medium">{allMembers[a]?.name || `#${a}`}</div>
                            <div className="justify-self-center">– и –</div>
                            <div className="justify-self-end font-medium">{allMembers[b]?.name || `#${b}`}</div>
                        </div>
                    }
                    {group.id === groupIds[1] && index >= Math.floor(roundPairs.length / 2) && group.id !== 0 &&
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-2 items-center justify-between rounded-xl border border-black px-4 py-2 text-xl"
                        >
                            <div className="justify-self-start font-medium">{allMembers[a]?.name || `#${a}`}</div>
                            <div className="justify-self-center">– и –</div>
                            <div className="justify-self-end font-medium">{allMembers[b]?.name || `#${b}`}</div>
                        </div>
                    }
                </>
            ))}
        </div>
    );
}
