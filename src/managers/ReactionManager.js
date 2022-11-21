export const getAllReactions = () => {
  return fetch("http://localhost:8000/reactions", {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const getReactionById = (id) => {
  return fetch(`http://localhost:8000/reactions/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const addReaction = (reaction) => {
  return fetch("http://localhost:8000/reactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(reaction),
  });
};

export const deleteReaction = (reactionId) => {
  return fetch(`http://localhost:8000/reactions/${reactionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  });
};

export const editReaction = (reaction) => {
  return fetch(`http://localhost:8000/reactions/${reaction.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(reaction),
  });
};
