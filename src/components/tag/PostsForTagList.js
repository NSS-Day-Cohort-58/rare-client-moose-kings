import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import { getTagById } from "../../managers/TagManager"
import { getAllPostsByTag } from "../../managers/PostManager"


export const ViewPostsForTagList = () => {
const {tagid} = useParams()
const [postsByTag, setAllPostsByTag] = useState([])
const [currentTag, setCurrentTag] = useState([])

useEffect(() => {
    getAllPostsByTag(tagid)
      .then((postsArray) => {
        setAllPostsByTag(postsArray);
      });
  }, []);

useEffect(() => {
    getTagById(tagid)
      .then((tag) => {
        setCurrentTag(tag);
      });
  }, []);



const renderListOfUserPosts = () => {
    return (
      <>
        <h1 className="title is-1 level-item">{currentTag.label} Posts</h1>
        {
            postsByTag.map(post => <>
                <div key={`post--${post.id}`}>
                    <div className="level">
                    <div className="columns level-item">
                    <div className="card column is-three-quarters">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src="https://bulma.io/images/placeholders/1280x960.png"
                          alt=""
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                        <div className="columns">
                            <div className="column">
                                <div className="media">
                        <div className="media-left">
                        <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="" />
                        </figure>
                        </div>
                        <div className="media-content">
                            <div>
                        <p className="title is-4">{post.user?.full_name}</p>
                            </div>
                            <div>
                        <p className="subtitle is-6">@{post.user.username}</p>
                            </div>
                        </div>
                    </div>
                            </div>
                        <div className="column">
                    <div className="content">
                        <div className="title is-3">
                        <Link to={`/posts/${post.id}`}>
                        {post.title}
                        </Link>
                        </div>
                        <div>{post.category.label}</div>
                        <time datetime>Publication Date: {post.publication_date}</time>

                    </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                </>
            )
        }
            </>
    )}

    return<>
{renderListOfUserPosts()}
            </>
}