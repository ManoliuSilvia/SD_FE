const BaseUrl = "http://localhost:8080/users/"

const UserService= {
    getUsers: () => {
        return fetch(`${BaseUrl}getAll`, { headers: {
            "Content-Type": "application/json"
            }})
    },
    getUser: (userId) =>{
        return fetch(`${BaseUrl}getById?id=${userId}`, {headers: {
            "Content-Type": "application/json"
            }})
    },
    login: (data) => {
        return fetch(`${BaseUrl}getByCredentials`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(data)
        })
    }
}

export default UserService