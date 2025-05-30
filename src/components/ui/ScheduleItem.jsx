import {ArrowRight, ChevronRight, UtensilsCrossed} from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import {Link} from "react-router-dom";
import {formatVerse} from "../../utils";
import {Verses} from "../../data";

const iconMap = {
    UtensilsCrossed,
}

export default function ScheduleItem({
                                         title,
                                         time,
                                         link,
                                         verseIndex,
                                         className,
                                         ...rest
                                     }) {
    const [isOpen, setIsOpen] = useState(false);
    const isSpoiler = !!verseIndex.toString(); // true если есть контент

    const toggleSpoiler = () => {
        if (isSpoiler) {
            setIsOpen(!isOpen);
        }
    };

    const Wrapper = isSpoiler ? "button" : "div";

    return (
        <div {...rest} className={clsx(className, "border border-black rounded-2xl overflow-hidden transition-all duration-300")}>
            <Wrapper
                onClick={toggleSpoiler}
                className="w-full flex items-center gap-4 p-1 pl-3 text-left min-h-12"
            >
                <div className="font-mono text-gray-500 text-lg">{time}{!!verseIndex}</div>
                <div className="flex-auto font-medium text-xl">{title}</div>


                    {!!isSpoiler ? (
                        <div
                            className={clsx(
                                "border border-black rounded-xl p-2",
                            )}
                        >
                            <ChevronRight className={clsx(
                                "transform transition-transform duration-300",
                                isOpen && "rotate-90"
                            )}/>
                        </div>
                    ) : !!link ? (
                        <Link to={link} className="border border-black rounded-xl p-2">
                            <ArrowRight/>
                        </Link>
                    ):(
                        <div className=""></div>
                    )}
            </Wrapper>

            {isSpoiler && (
                <div
                    className={clsx(
                        "transition-all duration-300 overflow-hidden px-3",
                        isOpen ? "max-h-96 py-3 border-t border-black" : "max-h-0 py-0 border-none"
                    )}
                >
                    <div className="font-semibold">{Verses[verseIndex].link}</div>
                    <div className="text-lg">{formatVerse(Verses[verseIndex].content)}</div>
                </div>
            )}
        </div>
    );
}
