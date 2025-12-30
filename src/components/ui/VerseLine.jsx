import { useEffect, useState } from "react";
import { formatVerse } from "../../utils";
import { Verses } from "../../data";

const verseGroups = [
    [Verses[0]],
    [Verses[1], Verses[2], Verses[3]],
    [Verses[4], Verses[5], Verses[6]],
    [Verses[7], Verses[8]]
];

const dates = [28.12, 29.12, 30.12, 31.12];
let todaysVerseGroup = [Verses[0]];

export default function VerseLine() {
    const [verse, setVerse] = useState(null);

    useEffect(() => {
        const nowDate = new Date().getDate() + "." + new Date().getMonth();
        const currentHour = new Date().getHours();
        let verseToShow;

        for (let i = 0; i < 4; i++) {
            if (dates[i] === Number(nowDate)) {
                todaysVerseGroup = verseGroups[i];
            }
        }

        if (currentHour >= 7 && currentHour < 13) {
            verseToShow = todaysVerseGroup[0];
        } else if (currentHour >= 13 && currentHour < 18) {
            verseToShow = todaysVerseGroup[1] || todaysVerseGroup[0];
        } else {
            verseToShow = todaysVerseGroup[2] || todaysVerseGroup[1] || todaysVerseGroup[0];
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
