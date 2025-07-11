import {getAuthGroup} from "../../utils";

const algorithms = {
    6: [
        [ [0, 5], [1, 2], [3, 4] ],
        [ [0, 3], [1, 4], [2, 5] ],
        [ [0, 4], [1, 5], [3, 4] ],
        [ [0, 1], [2, 3], [5, 4] ],
        [ [0, 2], [1, 4], [5, 3] ],
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
        [ [1, 3], [4, 5], [6, 2], [0, 13], [7, 8], [9, 10], [11, 12] ],
        [ [0, 5], [1, 4], [3, 6], [2, 9], [7, 12], [8, 11], [10, 13] ],
        [ [0, 4], [2, 6], [3, 5], [1, 8], [7, 11], [9, 13], [10, 12] ],
        [ [0, 2], [1, 3], [4, 6], [5, 12], [7, 9], [8, 10], [11, 13] ],
    ],
    114: [
        [ [0, 6], [1, 5], [2, 4], [3, 10], [7, 13], [8, 12], [9, 11] ],
        [ [0, 3], [1, 2], [5, 6], [4, 11], [7, 10], [8, 9], [12, 13] ],
        [ [1, 6], [2, 5], [3, 4], [0, 7], [8, 13], [9, 12], [10, 11] ],
        [ [1, 3], [4, 5], [6, 2], [0, 13], [7, 8], [9, 10], [11, 12] ],
        [ [0, 1], [2, 3], [4, 6], [5, 9], [7, 12], [8, 11], [10, 13] ],
        [ [0, 4], [2, 6], [3, 5], [1, 8], [7, 11], [9, 13], [10, 12] ],
        [ [0, 2], [1, 3], [4, 6], [5, 12], [7, 9], [8, 10], [11, 13] ],
    ],
};

export default function PrayRound({ allMembers = [], groupIds = [], roundId }) {
    const roundIndex = Number(roundId);
    const groupSize = allMembers.length;
    const group = getAuthGroup();

    let roundPairs = (groupIds.length === 2 && groupIds[0] === 1) ? algorithms[groupSize + 100]?.[roundIndex] : algorithms[groupSize]?.[roundIndex];

    if (!roundPairs) {
        return <div>Нет данных для такого раунда или размера группы. ({groupSize} участников, раунд {roundId})</div>;
    }

    return (
        <div className="space-y-2">
            {roundPairs.map(([a, b], index) => {
                
                let shouldShowPair = false;

                const isFirstGroup = group.id === groupIds[0];
                const isSecondGroup = group.id === groupIds[1];
                const middleIndex =  Math.floor(roundPairs.length / 2);

                if (group.id === 5) {shouldShowPair = true;}

                if (groupIds.length < 2) {
                    shouldShowPair = true;
                } else if (isFirstGroup && index <= middleIndex) {
                    shouldShowPair = true;
                } else if (isSecondGroup && index >= middleIndex) {
                    shouldShowPair = true;
                }
                

                if (shouldShowPair) {
                    return (
                        <div
                            key={index}
                            className="grid grid-cols-3 gap-2 items-center justify-between rounded-xl border border-black px-4 py-2 text-xl"
                        >
                            <div className="justify-self-start font-medium">{allMembers[a]?.name || `#${a}`}</div>
                            <div className="justify-self-center">– и –</div>
                            <div className="justify-self-end font-medium">{allMembers[b]?.name || `#${b}`}</div>
                        </div>
                    );
                }
            })}
        </div>
    );
}
