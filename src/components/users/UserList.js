import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getAllUsers, updateUser } from "../../managers/UserManager"
import { AuthorUsers } from "./AuthorUsers"
import { StaffUsers } from "./StaffUsers"


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
                                        is_active: user.user.is_active,
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
                                        is_active: user.user.is_active,
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
                                if (window.confirm("Are you sure you want to deactivate this user?")) {
                                    
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
                            }
                        }>
                        Deactivate
                    </button>
                    : ""
            }
        </>

    }

    const activeUsers = users.filter(user => user.user.is_active === true)
    const inactiveUsers = users.filter(user => user.user.is_active === false)

    return <>
        {
            loggedInUser?.user?.is_staff
            ? <StaffUsers 
            activeUsers={activeUsers}
            inactiveUsers={inactiveUsers} 
            removeAdminButton={removeAdminButton} 
            makeAdminButton={makeAdminButton}
            makeInactiveButton={makeInactiveButton}
            makeActiveButton={makeActiveButton}/>
            : <AuthorUsers 
            activeUsers={activeUsers}
            inactiveUsers={inactiveUsers} 
            removeAdminButton={removeAdminButton} 
            makeAdminButton={makeAdminButton}
            makeInactiveButton={makeInactiveButton}
            makeActiveButton={makeActiveButton}/>
        }
        
    </>
}