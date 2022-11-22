import "./Tags.css"
import { Link } from "react-router-dom"
import { deleteTag, getAllTags } from "../../managers/TagManager"
import { useNavigate } from "react-router-dom"

export const Tag = ({ tag }) => {
const navigate = useNavigate()

    return <section className="tags">
        <div className="tag is-large">
            <Link to={`/tags/${tag.id}/edit`}>
                { tag.label }
            </Link>
            <div>
            <button
                onClick={() => {
    navigate(`/tags/${tag.label}`)}}
            >
                View All {tag.label} Posts
            </button>
            <button
                  className="btn btn-primary"
                  onClick={() => deleteTag(tag.id).then(getAllTags)}
                >
                  Delete
            </button>
            </div>
        </div>
        
        
    </section>
}