export function formatVerse(text) {
    return text.split(/(\d+)/g).map((part, index) => {
        if (/^\d+$/.test(part)) {
            return (
                <span key={index} className="text-sm text-gray-400">
          {part}
        </span>
            );
        }
        return <span key={index}>{part}</span>;
    });
}