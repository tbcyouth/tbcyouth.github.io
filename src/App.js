import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Default';
import {Home, About, Schedule, QuietTime, Lesson, Login, Group, Feedback, Pray, Rule, Score, QuestionPage} from './pages/index';
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
                    <Route path="pray/:prayId" element={
                        <ProtectedRoute><Pray /></ProtectedRoute>
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
                    <Route path="score" element={
                        <ProtectedRoute><Score /></ProtectedRoute>
                    } />
                    <Route path="question" element={
                        <ProtectedRoute><QuestionPage /></ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </Router>
    );
}
