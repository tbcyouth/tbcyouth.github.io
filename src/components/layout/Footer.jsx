
export default function Footer() {
    return (
        <footer className="footer bg-black text-white py-4 mt-16">
            <div className="container">
                <div className="flex items-center gap-y-2 justify-between flex-col md:flex-row text-center">
                    <div className="">© {new Date().getFullYear()} TBC Youth. Все права защищены.</div>
                    <div className="">
                        Сделал с любовью: <a href="https://vladislavvlasov.github.io/" target="_blank" rel="noreferrer" className="font-medium">Владислав</a>, (Помог:&nbsp;<a href="https://github.com/1owski11" target="_blank" rel="noreferrer" className="font-medium">YSV</a>)
                    </div>
                </div>
            </div>
        </footer>
    )
}