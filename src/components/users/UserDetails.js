import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { addSubscription, endSubscription, getAllSubscriptions } from "../../managers/SubscriptionManager"
import { getUserById } from "../../managers/UserManager"
import { getAllPosts, getPostByUserId } from "../../managers/PostManager"


export const UserDetails = ({ token }) => {
    const [user, setUser] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [posts, setPosts] = useState([])
    const { userId } = useParams()

  const refreshUserData = () => {
    getUserById(userId).then((userData) => setUser(userData));
  };

  useEffect(() => {
    refreshUserData();
  }, [userId]);

    // useEffect(() => {
    //     getPostByUserId(user?.tokenNumber).then((userData) => setUserPosts(userData))
    // }, [userId])

    useEffect(() => {
        getAllPosts().then((postData) => setPosts(postData))
    }, [])


    const refreshSubscriptions = () => {
        getAllSubscriptions().then((subscriptionsFromAPI) => {
            setSubscriptions(subscriptionsFromAPI)
        })
    }

  useEffect(() => {
    refreshSubscriptions();
  }, []);

  const foundSub = subscriptions?.find(
    (subscription) =>
      subscription.follower.tokenNumber === token &&
      subscription.author === user.id &&
      subscription.ended_on === null
  );

    const userPosts = posts?.filter(post => post?.user?.tokenNumber === user?.tokenNumber )


    const unsubscribeButton = () => {
        return <>
            <button
                onClick={
                    () => {
                        endSubscription(
                            {
                                id: foundSub.id,
                                follower: foundSub.follower.id,
                                author: foundSub.author,
                                created_on: foundSub.created_on,
                                ended_on: ""
                            }
                        ).then(() => refreshSubscriptions())
                        .then(() => refreshUserData())
                    }}>
                Unsubscribe
            </button>

        </>
    }

  const subscribeButton = () => {
    return (
      <>
        <button
          onClick={() => {
            addSubscription({
              follower: token,
              author: user.id,
              created_on: "",
              ended_on: null,
            })
              .then(() => refreshSubscriptions())
              .then(() => refreshUserData());
          }}
        >
          Subscribe
        </button>
      </>
    );
  };

  const subscribedOrUnsubscribedButton = () => {
    if (foundSub) {
      return unsubscribeButton();
    } else if (!foundSub) {
      return subscribeButton();
    }
  };

    const renderPostsForUser = () => {
        return <>
        <div>
        {
            userPosts.map(post => {
            return <div key={`post--${post.id}`}>
                <div className="card">
                    <div>
                {post.title}
                    </div>
                {post.content}
                </div>
                <br></br>
                <br></br>
                <br></br>
                </div>
            })
        }
        </div>
        </>
    }

    return <>
        <div className="level">
            <div className="columns level-item">
                <div className="column is-7">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-2by1">
                                <img src={user.profile_image_url} alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4">{user.full_name}</p>
                                    <div>
                                        <p className="subtitle is-6">@{user?.user?.username}</p>
                                        <p className="subtitle is-6">Admin:
                                            {
                                                user?.user?.is_staff
                                                    ? " Yes"
                                                    : " No"

                                            }
                                        </p>
                                        <p className="subtitle is-6">Email: {user?.user?.email}</p>
                                        <p className="subtitle is-6">Date Joined: {user?.user?.date_joined}</p>
                                        <p className="subtitle is-6">Users sub count: {user?.sub_count}</p>
                                    </div>
                                    <div>
                                        {
                                            token !== user.tokenNumber
                                            ? subscribedOrUnsubscribedButton()
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
        <div>
        {renderPostsForUser()}
        </div>
        </div>
    </>
  );
};
