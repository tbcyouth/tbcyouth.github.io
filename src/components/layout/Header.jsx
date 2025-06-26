import {NavLink, useLocation} from 'react-router-dom';
import { AlignRight, X, House, Info, ClipboardList, ShieldAlert, Users, LogOut, LogIn, HeartPlus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {VerseLine} from "../index";

const iconMap = {
    House,
    Info,
    ClipboardList,
    Users,
    ShieldAlert,
    HeartPlus
};

const links = [
    {
        name: "Главная",
        link: "/",
        icon: "House",
        isOpen: true,
    },
    {
        name: "О нас",
        link: "/about",
        icon: "Info",
        isOpen: true,
    },
    {
        name: "Расписание",
        link: "/schedule/0",
        icon: "ClipboardList",
        isOpen: false,
    },
    {
        name: "Группа",
        link: "/group",
        icon: "Users",
        isOpen: false,
    },
    {
        name: "Правила",
        link: "/rule",
        icon: "ShieldAlert",
        isOpen: false,
    },
    {
        name: "Оценка",
        link: "/score",
        icon: "HeartPlus",
        isOpen: false,
    },
]

export default function Header({ title = "Title is empty", group = "Добро пожаловать" }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const pageTitles = {
        '/': 'Главная',
        '/about': 'О нас',
        '/contact': 'Контакты',
        '/login': 'Войти',
        '/group': 'Моя группа',
        '/feedback': 'Отзыв',
        '/rule': 'Правила',
        '/score': 'Оценка',
    };

    let currentTitle = pageTitles[location.pathname];

    if (!currentTitle) {
        if (location.pathname.startsWith('/schedule/')) {
            currentTitle = 'Расписание';
        } else if (location.pathname.startsWith('/quiet-time/')) {
            currentTitle = "Тихое время";
        } else if (location.pathname.startsWith('/pray/')) {
            currentTitle = "Парная молитва";
        } else if (location.pathname.startsWith('/lesson/')) {
            currentTitle = "Урок";
        } else {
            currentTitle = 'Страница';
        }
    }

    // Ссылки на меню и хедер
    const menuRef = useRef(null);
    const headerRef = useRef(null);

    // Функция для переключения состояния меню
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    // Закрытие меню при клике вне меню и хедера
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Проверяем, был ли клик вне хедера и меню
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                headerRef.current && !headerRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        // Добавляем обработчик событий
        document.addEventListener('click', handleClickOutside);

        // Убираем обработчик при размонтировании компонента
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Вы уверены?",
            text: "Вы действительно хотите выйти с аккаунта группы?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#909090",
            confirmButtonText: "Да",
            cancelButtonText: "Нет",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("authGroup");
                if (localStorage.getItem("isAdmin") === "aga") {
                    localStorage.removeItem("isAdmin");
                }
                setIsMenuOpen(false);
                navigate("/");

                Swal.fire({
                    title: "Успешно!",
                    text: "Вы успешно вышли с аккаунта группы",
                    confirmButtonText: "Хорошо",
                    confirmButtonColor: "#000",
                    icon: "success"
                });
            }
        });
    };

    const saved = localStorage.getItem("authGroup");
    const groupData = saved ? JSON.parse(saved) : null;

    return (
        <>
            {/* Header */}
            <header ref={headerRef} className="fixed top-0 left-0 right-0 bg-black text-white rounded-b-2xl z-50">

                <VerseLine/>
                    <div className="">
                        <div className="container">
                            <div className="pb-2.5 flex items-center justify-between gap-x-3">
                                <div className="flex gap-x-2 w-full">
                                    <div className="flex items-center">
                                        <img className="w-12" src="/logo.svg" alt="logo"/>
                                    </div>
                                    <div className="border-l border-gray-500 pl-3 relative flex-auto">
                                        <div className="font-semibold text-xl truncate absolute w-full">{currentTitle}</div>
                                        <div className="font-medium truncate absolute bottom-0 w-full">{group}</div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={toggleMenu}
                                        className="w-12 h-12 bg-white rounded-full "
                                    >
                                        {isMenuOpen ? (
                                            <div className="relative flex items-center justify-center w-full h-full">
                                                <X className="w-7 h-7 text-black pointer-events-none opacity-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                                <AlignRight
                                                    className="w-7 h-7 text-black pointer-events-none opacity-0 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                            </div>

                                        ) : (
                                            <div className="relative flex items-center justify-center w-full h-full">
                                                <X className="w-7 h-7 text-black pointer-events-none opacity-0 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                                <AlignRight
                                                    className="w-7 h-7 text-black pointer-events-none opacity-100 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </header>

            <div
                ref={menuRef}
                className={`pt-24 fixed top-0 right-0 w-64 h-full bg-white text-black border-l border-black z-20 transform ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 overflow-auto`}
            >
                <div className="flex flex-col p-5 h-full">
                    <div className="space-y-2 flex-auto">
                        {links.map(({ name, link, icon , isOpen}) => {
                            const Icon = iconMap[icon];

                            if (isOpen || !!groupData) return (
                                <NavLink
                                    key={link}
                                    to={link}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 text-xl font-medium px-3 py-1 rounded-md transition-colors ${
                                            isActive ? 'bg-slate-200' : 'hover:bg-slate-300'
                                        }`
                                    }
                                    onClick={toggleMenu}
                                >
                                    {Icon && <Icon className="w-5 h-5 mr-1" />}
                                    {name}
                                </NavLink>
                            );

                            return null;
                        })}
                    </div>
                    <div className="">
                        {groupData ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 w-full text-xl font-medium px-3 py-1 bg-red-100 rounded-md transition-colors hover:bg-red-300 hover:text-white"
                            >
                                <LogOut className="w-5 h-5 mr-1"/>
                                Выйти
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `flex items-center gap-2 text-xl font-medium px-3 py-1  rounded-md transition-colors ${
                                        isActive ? 'bg-slate-200' : 'hover:bg-slate-300'
                                    }`
                                }
                                onClick={toggleMenu}
                            >
                                <LogIn className="w-5 h-5 mr-1"/>
                                Войти
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
