// pages/LoginPage.jsx
import { useState } from "react";
import groupsData from "../data/groups.json";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import {getAuthGroup} from "../utils";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPass, setIsPass] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const auth = getAuthGroup();

    if (!!auth) {
        return <Navigate to="/group" state={{ from: location }} replace />;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const group = groupsData.find(g => g.login === login);
        if (!group) {
            setError("Неверный логин или пароль");
            return;
        }

        if (password === group.adminpass) {
            localStorage.setItem("groupId", group.id);
            localStorage.setItem("isAdmin", "zXsdjkck-23nsj22-lasd-222jd-pqpw");
            navigate("/group");
        } else if (password === group.password) {
            localStorage.setItem("groupId", group.id);
            localStorage.removeItem("isAdmin");
            navigate("/group");
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
                    <div className="p-2 cursor-pointer" onClick={() => setIsPass(prev => !prev)}>
                        {isPass ? <Eye /> : <EyeOff />}
                    </div>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button className="bg-black text-white rounded p-2">Войти</button>
            </form>
        </div>
    );
}
