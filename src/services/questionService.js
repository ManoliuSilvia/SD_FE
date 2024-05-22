import question from "../pages/question";

const BaseUrl = "http://localhost:8080/questions/"

const QuestionService= {
    getQuestions: () => {
        return fetch(`${BaseUrl}getAll`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getMyQuestions: (userId) => {
        return fetch(`${BaseUrl}filterByUser?userId=${userId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getQuestionsByTag: (tagName) => {
        return fetch(`${BaseUrl}filterByTag?tagName=${tagName}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getQuestionsByTitle: (title) => {
        return fetch(`${BaseUrl}searchByTitle?title=${title}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    getQuestion: (questionId) => {
        return fetch(`${BaseUrl}getById?questionId=${questionId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    editQuestion: (data,userId) => {
        return fetch(`${BaseUrl}updateQuestion?userId=${userId}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'put',
            body: JSON.stringify(data)
        })
    },
    addQuestion: (data) => {
        return fetch(`${BaseUrl}addQuestion`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(data)
        })
    },
    deleteQuestion: async (questionId, userId) => {
        return fetch(`${BaseUrl}deleteById?questionId=${questionId}&userId=${userId}`, {
            headers:{
                "Content-Type": "application/json"
            },
            method:'DELETE'
        })
    }
}

export default QuestionService