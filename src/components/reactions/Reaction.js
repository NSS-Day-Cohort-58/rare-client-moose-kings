import { Link } from "react-router-dom";
import {
  deleteReaction,
  getAllReactions,
} from "../../managers/ReactionManager";

export const Reaction = ({ reaction }) => (
  <section className="reactions">
    <div className="reaction is-large">
      <Link to={`/reactions/${reaction.id}/edit`}>
        {reaction.label} {reaction.emoji}
      </Link>
      <button
        className="btn btn-primary"
        onClick={() => deleteReaction(reaction.id).then(getAllReactions)}
      >
        Delete
      </button>
    </div>
  </section>
);
