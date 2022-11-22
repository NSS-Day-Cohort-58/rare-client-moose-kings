import { Link } from "react-router-dom"




export const StaffUsers = ({activeUsers, inactiveUsers, removeAdminButton, makeAdminButton, makeInactiveButton, makeActiveButton}) => {


return <>
<h1 className="title is-1 level-item">Active Users</h1>
        {
            activeUsers.map(user => {
                return <>
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
                </>
            })

        }

<h1 className="title is-1 level-item">Inactive Users</h1>
        {
            inactiveUsers.map(user => {
                return <>
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
                </>
            })
        }
</>
}