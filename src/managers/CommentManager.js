export const getAllComments = () => {
    return fetch("http://localhost:8000/comments")
        .then(res => res.json())
    }
export const addComment = comment => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
    }
export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE"
    })
    }