import { useEffect, useState } from "react";
import { formatVerse } from "../../utils";
import { Verses } from "../../data";

const verseGroups = [
    [Verses[0], Verses[1]], // Группа из 2 стихов
    [Verses[2], Verses[3], Verses[4]], // Группа из 3 стихов
    [Verses[5], Verses[6], Verses[7]], // Группа из 3 стихов
    [Verses[8], Verses[9], Verses[10]], // Группа из 3 стихов
    [Verses[11], Verses[12], Verses[13]], // Группа из 3 стихов
    [Verses[14], Verses[15], Verses[16]], // Группа из 3 стихов
    [Verses[17], Verses[18]], // Группа из 2 стихов
];

export default function VerseLine() {
    const [verse, setVerse] = useState(null);

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();

        const dayNumber = Math.floor(now.getTime() / (1000 * 60 * 60 * 24));
        const dailyGroupIndex = dayNumber % verseGroups.length;
        const todaysVerseGroup = verseGroups[dailyGroupIndex];

        let verseToShow;

        if (currentHour >= 7 && currentHour < 13) {
            // Период 1: с 7:00 до 12:59
            // Показываем первый стих в группе
            verseToShow = todaysVerseGroup[0];
        } else if (currentHour >= 13 && currentHour < 18) {
            // Период 2: с 13:00 до 17:59
            // Показываем второй стих. Если в группе его нет, показываем первый.
            verseToShow = todaysVerseGroup[1] || todaysVerseGroup[0];
        } else {
            // Период 3: вечер и ночь (с 18:00 до 6:59 следующего дня)
            // Показываем третий стих. Если его нет, показываем последний доступный в группе.
            verseToShow = todaysVerseGroup[2] || todaysVerseGroup[todaysVerseGroup.length - 1];
        }

        setVerse(verseToShow);
    }, []); // пустой массив означает, что выполнится один раз при монтировании

    if (!verse) return null;

    return (
        // eslint-disable-next-line jsx-a11y/no-distracting-elements
        <marquee>
            <div className="flex">
                <div className="italic">«{formatVerse(verse.content)}»</div>
                <div>&nbsp;–&nbsp;{verse.link}</div>
            </div>
        </marquee>
    );
}
