import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Default';
import {Home, About, Schedule, QuietTime, Lesson, Login, Group, Feedback, Pair, Rule} from './pages/index';
import {ProtectedRoute} from "./components";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* Открытая страница */}
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="about" element={<About />} />

                    {/* Защищённые маршруты */}
                    <Route path="schedule/:dayPosition" element={
                        <ProtectedRoute><Schedule /></ProtectedRoute>
                    } />
                    <Route path="quiet-time/:quietTimeId" element={
                        <ProtectedRoute><QuietTime /></ProtectedRoute>
                    } />
                    <Route path="lesson/:lessonId" element={
                        <ProtectedRoute><Lesson /></ProtectedRoute>
                    } />
                    <Route path="pair/:pairId" element={
                        <ProtectedRoute><Pair /></ProtectedRoute>
                    } />
                    <Route path="group" element={
                        <ProtectedRoute><Group /></ProtectedRoute>
                    } />
                    <Route path="feedback" element={
                        <ProtectedRoute><Feedback /></ProtectedRoute>
                    } />
                    <Route path="rule" element={
                        <ProtectedRoute><Rule /></ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </Router>
    );
}
