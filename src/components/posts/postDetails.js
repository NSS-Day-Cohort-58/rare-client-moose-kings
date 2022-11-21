import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getPostById,
  deletePost,
  getAllReactions,
} from "../../managers/PostManager";
import { Link } from "react-router-dom";
//import { PostComments } from "./postComments"

export const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [reactions, setReactions] = useState([]);
  
  useEffect(() => {
    getPostById(postId).then((postData) => setPost(postData));
  }, [postId]);

  useEffect(() => {
    getAllReactions().then((ReactionsData) => setReactions(ReactionsData));
  }, []);

  const renderDeleteButton = (postId) => {
    return (
      <>
        <button
          className="button is-small is-danger is-focused"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this post?")) {
              makeDeleteRequest(postId);
            }
          }}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </>
    );
  };

  const makeDeleteRequest = (postId) => {
    deletePost(postId).then(() => {
      navigate("/allposts");
    });
  };

  const displayPostDetailsCard = () => {
    return (
      <>
        <section className="columns">
          <div class="card column">
            <div class="card-image">
              <figure class="image is-4by3">
                <img
                  src="https://bulma.io/images/placeholders/1280x960.png"
                  alt=""
                />
              </figure>
            </div>
            <div class="card-content">
              <div className="columns">
                <div className="column">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/96x96.png"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <div>
                        <Link
                          className="title is-4 color is-primary"
                          to={`/userprofile/${post.user_id}`}
                        >
                          {post?.user?.full_name}
                        </Link>
                      </div>
                      <div>
                        <p class="subtitle is-6">@{post?.user?.username}</p>
                      </div>
                      <div>
                        <p class="subtitle is-6">{post.publication_date}</p>
                      </div>
                      {renderDeleteButton(postId)}
                    </div>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="title is-5 level-item">Reactions</div>
                  <div className="box">
                    <div>
                      {reactions.map((reaction) => {
                        return (
                          <>
                            <button
                              className="button is-small is-focused"
                              type="submit"
                              value={reaction.id}
                              onClick={(evt) => {
                                evt.preventDefault();
                                fetch(`http://localhost:8000/postreactions`, {
                                  method: "POST",
                                  headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Token ${localStorage.getItem("auth_token")}`,
                                  },
                                  body: JSON.stringify({
                                    post_id: postId,
                                    reaction_id: reaction.id
                                  })
                                })
                              }}
                            >
                              {reaction.emoji}
                            </button>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <button className="button is-primary">
                    <Link to={`/posts/${postId}/comments`}>
                      View Post Comments
                    </Link>
                  </button>
                </div>
              </div>
              <div className="column is-one-third">
                <div className="title is-5 level-item">Reactions</div>
                <div className="box">{post?.reaction?.emoji}</div>
                <button className="button is-primary">
                  <Link to={`/posts/${postId}/comments`}>View Post Comments</Link></button>
                  <button className="button is-primary">
                  <Link to={`/posts/${postId}/newcomment`}>Make a Comment</Link></button>
              </div>
            </div>
            <div class="content">
              {post.content}
            </div>
          </div>
          <div className="column is-one-fifth box">
            <div className="level">
              <h3 className="title is-5 level-item">Category</h3>
            </div>
            <div className="level-item">
              <div>{post?.category?.label}</div>
            </div>
            <br></br>
            <div className="level">
              <h3 className="title is-5 level-item">Tags</h3>
            </div>
            <div className="level-item">{post?.tag?.label}</div>
          </div>
        </section>
      </>
    );
  };
  return (
    <section>
      <div>
        <h1 className="title is-primary level-item">{post.title}</h1>
        <div className="level">
          <div className="columns level-item">
            <div className="column is-three-quarters">
              {displayPostDetailsCard()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

