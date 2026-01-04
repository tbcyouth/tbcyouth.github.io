// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // <--- Импорт из твоего файла
import { Groups } from '../data/groups.json';   // <--- Твой файл с группами

const AuthContext = createContext();

// Хук для быстрого доступа к контексту
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // 1. Состояние для хранения данных
    const [currentUser, setCurrentUser] = useState(null); // Объект пользователя Firebase
    const [groupData, setGroupData] = useState(null);     // Объект группы из groups.json
    const [loading, setLoading] = useState(true);        // Для первого запуска

    // 2. Функция для поиска данных группы по email/логину
    const findGroupData = (userEmail) => {
        // Логин группы может быть в формате email, например "leader@tbc.camp"
        const foundGroup = Groups.find(g => g.login.toLowerCase() === userEmail.toLowerCase());
        return foundGroup || null;
    };

    // 3. Эффект для подписки на изменения статуса Firebase
    useEffect(() => {
        // onAuthStateChanged - это подписка: как только статус входа меняется, эта функция срабатывает
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Пользователь залогинен
                const group = findGroupData(user.email);
                
                if (group) {
                    setGroupData(group);
                    setCurrentUser(user);
                } else {
                    // Если пользователя нет в твоем JSON, но он залогинен в Firebase (ошибка?)
                    setGroupData(null);
                    setCurrentUser(null);
                    signOut(auth); // Разлогиниваем
                }
            } else {
                // Пользователь разлогинен
                setGroupData(null);
                setCurrentUser(null);
            }
            setLoading(false);
        });

        // Функция очистки при размонтировании компонента
        return unsubscribe; 
    }, []); 

    // 4. Функции для логина/логаута (обертки над Firebase)
    const login = async (email, password) => {
        // Проверяем, есть ли такой email в твоем JSON (чтобы не пускать чужих)
        const localGroup = findGroupData(email);
        if (!localGroup) {
            throw new Error("Неверный логин. Такой группы не существует.");
        }
        
        // Вход через Firebase
        await signInWithEmailAndPassword(auth, email, password);
        // После успешного входа, useEffect выше сам обновит groupData
    };

    const logout = () => {
        signOut(auth);
    };
    
    // ВАЖНО: getAuthGroup() из utils.js теперь не нужен, но его логику мы перенесли в isAdmin/isLoggedIn

    const isAdmin = () => {
        // Проверка на админа (по логину или по id=7, как было ранее)
        return groupData?.id === 7 || groupData?.name === "Администратор";
    };

    const value = {
        currentUser,
        groupData,
        loading,
        isLoggedIn: !!groupData, // Упрощенная проверка
        isAdmin,
        login,
        logout,
    };

    // 5. Пока идет первая загрузка, можно показать спиннер
    if (loading) {
        return <div className="container text-center py-20">Загрузка...</div>;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};