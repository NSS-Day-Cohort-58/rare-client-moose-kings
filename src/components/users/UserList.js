import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getAllUsers, updateUser } from "../../managers/UserManager"


export const UserList = ({ loggedInUser }) => {

    const [users, setUsers] = useState([])

    const getUsers = () => {
        getAllUsers().then((usersFromAPI) => {
            setUsers(usersFromAPI)
        }
        )
    }

    useEffect(
        () => {
            getUsers()
        }, [])



    const makeAdminButton = (user) => {
        return <>
            {
                loggedInUser?.user?.is_staff
                    ? <button
                        onClick={
                            () => {
                                updateUser(
                                    {
                                        id: user.id,
                                        bio: user.bio,
                                        profile_image_url: user.profile_image_url,
                                        is_staff: 1,
                                        is_active: user.user.is_active
                                    }
                                ).then(() => getUsers())
                            }
                        }>
                        Make Admin
                    </button>
                    : ""
            }
        </>

    }
    const removeAdminButton = (user) => {
        return <>
            {
                loggedInUser?.user?.is_staff
                    ? <button
                        onClick={
                            () => {
                                updateUser(
                                    {
                                        id: user.id,
                                        bio: user.bio,
                                        profile_image_url: user.profile_image_url,
                                        is_staff: 0,
                                        is_active: user.user.is_active
                                    }
                                ).then(() => getUsers())
                            }
                        }>
                        Remove Admin
                    </button>
                    : ""
            }
        </>

    }
    const makeActiveButton = (user) => {
        return <>
            {
                loggedInUser?.user?.is_staff
                    ? <button
                        onClick={
                            () => {
                                updateUser(
                                    {
                                        id: user.id,
                                        bio: user.bio,
                                        profile_image_url: user.profile_image_url,
                                        is_staff: user.user.is_staff,
                                        is_active: 1
                                    }
                                ).then(() => getUsers())
                            }
                        }>
                        Activate
                    </button>
                    : ""
            }
        </>

    }
    const makeInactiveButton = (user) => {
        return <>
            {
                loggedInUser?.user?.is_staff
                    ? <button
                        onClick={
                            () => {
                                updateUser(
                                    {
                                        id: user.id,
                                        bio: user.bio,
                                        profile_image_url: user.profile_image_url,
                                        is_staff: user.user.is_staff,
                                        is_active: 0
                                    }
                                ).then(() => getUsers())
                            }
                        }>
                        Deactivate
                    </button>
                    : ""
            }
        </>

    }

    return <>
        <h1 className="title is-1 level-item">Active Users</h1>
        {
            users?.map(user =>
                <div className="my-4" key={`user--${user.id}`}>
                    <div className="level">
                        <div className="columns level-item">
                            <div className="column is-7">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-content">
                                                <Link to={`${user.id}/details`}>
                                                    <p className="title is-4">{user.full_name}</p>
                                                </Link>
                                                <div>
                                                    <p className="subtitle is-6">@{user.user.username}</p>
                                                    <p className="subtitle is-6">Admin:
                                                        {
                                                            user.user.is_staff
                                                                ? " Yes"
                                                                : " No"

                                                        }</p>
                                                </div>
                                                {
                                                    user.user.is_staff
                                                        ? removeAdminButton(user)
                                                        : makeAdminButton(user)
                                                }
                                                {
                                                    user.user.is_active
                                                        ? makeInactiveButton(user)
                                                        : makeActiveButton(user)
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </>
}