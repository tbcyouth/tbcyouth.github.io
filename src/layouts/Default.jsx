import { Outlet } from 'react-router-dom';
import {Footer, Header} from '../components/index';
import {getAuthGroup} from "../utils";



export default function Layout() {
    const group = getAuthGroup();

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
