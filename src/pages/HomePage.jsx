import {Header} from '../components';
import {sendMessage} from "../utils";
import {Link} from "react-router-dom";
import {ArrowRight, LogIn} from "lucide-react";

function App() {
    return (
        <>
            <section className="mt-6">
                <div  className="container">
                    <div className="">
                        <h1 className="text-3xl font-bold">Добро пожаловать на сайт</h1>
                        <p className="my-4">Мы TBC Youth, самые лучшие ребята, энергичные, креативные.</p>
                        <div className="flex gap-2">
                            <Link className="inline-flex items-center gap-2 rounded-2xl bg-black text-white px-6 py-2 text-xl" to="/login">Войти <LogIn/></Link>
                            <Link className="inline-flex items-center gap-2 rounded-2xl border border-black px-6 py-2 text-xl" to="/about">О нас</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
