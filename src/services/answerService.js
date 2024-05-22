const BaseUrl = "http://localhost:8080/answers/"

const AnswerService = {
    getAnswers : (questionId) =>{
        return fetch(`${BaseUrl}GetAllForQuestion?questionId=${questionId}`,{
            headers: {
                "Content-Type": "application/json"}
        })
    },
    addAnswer : (questionId, data) =>{
        return fetch(`${BaseUrl}addAnswer?questionId=${questionId}`,{
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data),
            method:'POST'
        })
    },
    deleteAnswer: async (answerId, userId) => {
        return fetch(`${BaseUrl}deleteAnswer?answerId=${answerId}&userId=${userId}`, {
            headers:{
                "Content-Type": "application/json"
            },
            method:'DELETE'
        })
    }
}

export default AnswerService