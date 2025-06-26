import { Link } from "react-router-dom";
import {
    LogIn,
    ArrowRightCircle,
    Heart,
    Users,
    Star,
    HelpCircle,
} from "lucide-react";

function App() {
    return (
        <>
            <section className="mt-6">
                <div className="container space-y-16">

                    {/* БАННЕР */}
                    <div className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10 text-white text-center shadow-xl">
                        <h1 className="text-4xl font-extrabold">Добро пожаловать в TBC Youth</h1>
                        <p className="text-xl mt-2">Место, где ты можешь расти, влиять и быть собой.</p>
                        <div className="flex justify-center gap-4 mt-6 flex-col sm:flex-row">
                            <Link to="/login" className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition">
                                Войти <LogIn className="inline-block w-5 h-5 ml-1" />
                            </Link>
                            <Link to="/about" className="px-6 py-2 border-2 border-white rounded-full font-bold hover:bg-white hover:text-black transition">
                                Подробнее о нас
                            </Link>
                        </div>
                    </div>

                    {/* НАШИ ЦЕННОСТИ */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Наше сердце ❤️</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Value icon={<Heart />} title="Любовь к Богу" desc="Иисус — центр всего. Мы любим Его и следуем за Ним." />
                            <Value icon={<Users />} title="Единство" desc="Одна команда. Один дух. Мы вместе в радости и в борьбе." />
                            <Value icon={<Star />} title="Рост" desc="Мы вдохновляем друг друга на развитие и духовную зрелость." />
                        </div>
                    </div>

                    {/* ЦИТАТА */}
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded-xl text-center max-w-2xl mx-auto">
                        <p className="text-lg italic">
                            "Но вы — род избранный, царственное священство, народ святой, люди взятые в удел..."
                        </p>
                        <p className="mt-2 text-gray-700">– 1 Петра 2:9</p>
                    </div>

                    {/* ОТЗЫВЫ */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-6">Отзывы участников</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                            <Testimonial name="Мелисса, 85 лет" text="Зачем?" />
                            <Testimonial name="Влад, 17 лет" text="Таниш-былиш отзывы" />
                            <Testimonial name="Давид, 17 лет" text="Прикольные, весёлые, но очень стеснительные, а главное гостеприимные" />
                        </div>
                    </div>

                    {/* ПРЕИМУЩЕСТВА */}
                    <div>
                        <h2 className="text-2xl font-bold text-center mb-6">Почему стоит быть с нами?</h2>
                        <ul className="text-lg max-w-xl mx-auto space-y-2 text-gray-800">
                            <li>💬 Живые обсуждения и глубокие темы</li>
                            <li>🎉 Весёлые активности и креативные проекты</li>
                            <li>🙏 Молитвенная поддержка и духовное наставничество</li>
                            <li>🌱 Настоящие перемены в жизни через Бога</li>
                        </ul>
                    </div>

                    {/* FAQ */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Часто задаваемые вопросы</h2>
                        <div className="space-y-4 max-w-2xl mx-auto">
                            <Faq
                                question="Кто может участвовать?"
                                answer="Любой подросток от 14 до 25 лет. Независимо от опыта и знаний — ты важен!"
                            />
                            <Faq
                                question="Сколько стоит?"
                                answer="Всегда по разному. Часть покрывает церковь."
                            />
                            <Faq
                                question="Я никого не знаю. Что делать?"
                                answer="Это нормально! Мы дружелюбная семья, и ты быстро вольёшься в коллектив."
                            />
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 bg-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition">
                            Присоединиться <ArrowRightCircle className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

function Value({ icon, title, desc }) {
    return (
        <div className="p-4 border rounded-xl shadow-sm hover:shadow-md transition text-center">
            <div className="text-3xl text-indigo-500 mb-2">{icon}</div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{desc}</p>
        </div>
    );
}

function Testimonial({ name, text }) {
    return (
        <div className="bg-white border rounded-xl shadow-sm p-4">
            <p className="italic text-gray-800">"{text}"</p>
            <p className="mt-2 text-sm text-gray-600">— {name}</p>
        </div>
    );
}

function Faq({ question, answer }) {
    return (
        <div className="bg-gray-100 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2"><HelpCircle className="w-5 h-5" /> {question}</h4>
            <p className="mt-1 text-gray-600">{answer}</p>
        </div>
    );
}

export default App;
