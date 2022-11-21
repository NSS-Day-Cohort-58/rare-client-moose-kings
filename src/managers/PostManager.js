
export const getAllPosts = () => {
return fetch("http://localhost:8000/posts", {
    headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
    .then(res => res.json())
}
export const getAllReactions = () => {
return fetch("http://localhost:8000/reactions", {
    headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
    .then(res => res.json())
}

export const getAllPostsByTitleSearch = (searched) => {
return fetch(`http://localhost:8000/posts?title=${searched}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
    .then(res => res.json())
}

export const getAllPostsByCategory = (categoryId) => {
    if (categoryId === 0) {
        return fetch("http://localhost:8000/posts", {
    headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
    .then(res => res.json())
    }
    else {
        return fetch(`http://localhost:8000/posts?category=${categoryId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("auth_token")}`
            }
        })
            .then(res => res.json())
    }
}

export const getPostById = (id) => {
return fetch(`http://localhost:8000/posts/${id}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
    .then(res => res.json())
}

export const getPostByUserId = (token) => {
return fetch(`http://localhost:8000/posts?user=${token}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
    .then(res => res.json())
}

export const addPost = post => {
return fetch("http://localhost:8000/posts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(post)
    
}).then(res => res.json())
}

export const updatePost = post => {
return fetch(`http://localhost:8000/posts/${post.id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(post)
})
}

export const deletePost = (postId) => {
return fetch(`http://localhost:8000/posts/${postId}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
}

export const getSubscribedPosts = (token) => {
    return fetch(`http://localhost:8000/posts?subscribed=${token}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
    }