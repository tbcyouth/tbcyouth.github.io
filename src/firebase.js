// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// СКОПИРОВАННЫЕ НАСТРОЙКИ (твои данные!)
const firebaseConfig = {
    apiKey: "AIzaSyAFzV8OuCbpl0_ntF21k-dqNy7CaWbn0PI",
    authDomain: "tbc-seminars-db.firebaseapp.com",
    projectId: "tbc-seminars-db",
    storageBucket: "tbc-seminars-db.firebasestorage.app",
    messagingSenderId: "680428946984",
    appId: "1:680428946984:web:314744c91fcc061d5f571d"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспортируем нужные сервисы
export const auth = getAuth(app); // Сервис аутентификации
export const db = getFirestore(app); // Сервис базы данных Firestore