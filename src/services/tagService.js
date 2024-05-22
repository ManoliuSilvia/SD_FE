const BaseUrl = "http://localhost:8080/tags/"


const TagService = {
    getTags: () => {
        return fetch(`${BaseUrl}getAll`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
    addTag: (data) => {
        return fetch(`${BaseUrl}addTag`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'post',
            body: JSON.stringify(data)
        })
    }
}

export default TagService