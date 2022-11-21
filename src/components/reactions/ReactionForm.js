import { useRef } from "react";
// import { useNavigate } from 'react-router-dom'
import { addReaction } from "../../managers/ReactionManager";
// import "./Reactions.css"

export const ReactionForm = ({ getReactions }) => {
  const label = useRef(null);
  const emoji = useRef(null);
  // const navigate = useNavigate()

  const constructNewReaction = () => {
    addReaction({
      label: label.current.value,
      emoji: emoji.current.value,
    }).then(getReactions);
  };

  return (
    <form className="reactionForm">
      <h1 class="title is-3">Create a new reaction</h1>

      <div className="field">
        <label class="label is-medium" htmlFor="reactionLabel">
          Reaction Text:{" "}
        </label>
        <div className="control">
          <input
            class="input is-medium"
            type="text"
            id="reactionLabel"
            ref={label}
            required
            autoFocus
            placeholder="Reaction name"
          />
        </div>
      </div>
      <div className="field">
        <label class="label is-medium" htmlFor="reactionEmoji">
          Reaction Emoji:{" "}
        </label>
        <div className="control">
          <input
            class="input is-medium"
            type="text"
            id="reactionEmoji"
            ref={emoji}
            required
            autoFocus
            placeholder="Reaction emoji"
          />
        </div>
      </div>

      <div className="control">
        <button
          className="button"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            constructNewReaction();
          }}
        >
          Save Reaction
        </button>
      </div>
    </form>
  );
};
