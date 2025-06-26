// pages/LoginPage.jsx
import { useState } from "react";
import groupsData from "../data/groups.json";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {Eye, EyeOff} from "lucide-react";

export default function LoginPage() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isPass, setIsPass] = useState(true)

    const authGroup = localStorage.getItem("authGroup");
    const location = useLocation();

    if (authGroup) {
        return <Navigate to="/group" state={{ from: location }} replace />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const group = groupsData.find(
            g => g.login === login && g.password === password
        );

        if (group) {
            if (group.id >= 5) {
                localStorage.setItem("authGroup", JSON.stringify(group));
                localStorage.setItem("isAdmin", "aga");
                navigate("/group");
            } else if (group.id < 5) {
                localStorage.setItem("authGroup", JSON.stringify(group));
                navigate("/group");
            }
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div className="container max-w-sm mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4">Вход</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    className="border rounded p-2"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <div className="border rounded flex items-center">
                    <input
                        className="p-2 w-full"
                        placeholder="Пароль"
                        type={isPass ? "password" : "text"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="p-2" onClick={() => setIsPass(prev => !prev)}> {isPass ? <Eye/> : <EyeOff/>}</div>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button className="bg-black text-white rounded p-2">Войти</button>
            </form>
        </div>
    );
}
