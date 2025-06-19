import {formatVerse} from "../../utils";
import {Verses} from "../../data";

const allVerses = [...Verses]

export default function VerseLine () {
    return (
        /* eslint-disable jsx-a11y/no-distracting-elements */
        <marquee>
            <div className="flex">
                <div className="italic">«{formatVerse(allVerses[(Math.floor(Math.random() * allVerses.length))].content)}»</div>
                <div className="">&nbsp;–&nbsp;{allVerses[(Math.floor(Math.random() * allVerses.length))].link}</div>
            </div>
        </marquee>
        /* eslint-enable jsx-a11y/no-distracting-elements */
    )
}