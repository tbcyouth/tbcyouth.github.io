
export default function Footer() {
    return (
        <footer className="footer bg-black text-white py-4">
            <div className="container">
                <div className="flex items-center gap-y-2 justify-between flex-col md:flex-row">
                    <div className="">© «TASHKENT BETHEL CHURCH», {new Date().getFullYear()}</div>
                    <div className="">
                        Сделал с любовью: <a href="https://vladislavvlasov.github.io/" target="_blank" rel="noreferrer" className="font-medium">Владислав</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}