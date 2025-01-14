export const getAllComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
    }
export const addComment = comment => {
    return fetch("http://localhost:8000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(comment)
    })
    }
export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`  
        }
    })
    }


export const getCommentsByPostId = (postId) => {
    return fetch(`http://localhost:8000/comments?posts=${postId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
    }

export const editCurrentComment = (comment) => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(comment)
    })
    }

export const getCommentById = (id) => {
    return fetch(`http://localhost:8000/comments/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
    }