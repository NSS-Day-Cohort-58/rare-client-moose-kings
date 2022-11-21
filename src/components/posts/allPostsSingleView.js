import { Link, useParams } from "react-router-dom"



// This component is responsible for rendering the individual view for each post. Props are passed from the AllPosts component using object deconstruction.
export const AllPostsSingleView = ({title, publicationDate, authorFirstName, authorLastName, category, tag, id, fullname}) => {
    // const {post_id} = useParams()
return <>
<section>

<div className="columns">
    <div className="column level">
    <Link className="level-item" to={`/posts/${id}`} >{title}</Link>
    </div>
    <div className="column level">
<div className="level-item">{fullname}</div>
    </div>
    <div className="column level">
<div className="level-item">{publicationDate}</div>
    </div>
    <div className="column level">
<span className="level-item">{category}</span>
    </div>
</div>

</section>
</>
}