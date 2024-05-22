import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import UserPage from "./pages/user";
import QuestionPage from "./pages/question";
import AnswerPage from "./pages/answer";
import LoginPage from "./pages/login";
import AddQuestionPage from "./pages/addQuestion";
import AddAnswerPage from "./pages/AddAnswer";
import EditQuestion from "./pages/editQuestion";
import EditQuestionPage from "./pages/editQuestion";

const router = createBrowserRouter([
    {
        path: "/user",
        element: <UserPage />

    },
    {
        path: "/login",
        element: <LoginPage />

    },

    {
        path: "/question",
        element: <QuestionPage />

    },
    {
        path: '/question/:id',
        element: <AnswerPage />
    },
    {
        path: '/addQuestion/:id',
        element: <AddQuestionPage />
    },
    {
        path: '/addAnswer/:userId/:questionId',
        element: <AddAnswerPage />
    },
    {
        path: '/editQuestion/:questionId',
        element:<EditQuestionPage/>
    }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />);

reportWebVitals();
