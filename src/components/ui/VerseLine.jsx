import { useEffect, useState } from "react";
import { formatVerse } from "../../utils";
import { Verses } from "../../data";

export default function VerseLine() {
    const [verse, setVerse] = useState(null);

    useEffect(() => {
        const allVerses = [...Verses];
        const randomIndex = Math.floor(Math.random() * allVerses.length);
        setVerse(allVerses[randomIndex]);
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
