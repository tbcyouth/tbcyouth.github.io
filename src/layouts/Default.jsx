import { Outlet } from 'react-router-dom';
import {Footer, Header} from '../components/index';



export default function Layout() {

    const saved = localStorage.getItem("authGroup");
    const group = saved ? JSON.parse(saved) : null;


    return (
        <div className="flex flex-col min-h-screen">
            <Header group={!!group ? group.name : "Добро пожаловать"}/>

            <main className="mt-28 flex-grow">
                <Outlet/>
            </main>

            <Footer/>
        </div>
    );
}
