import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReactionById, editReaction } from "../../managers/ReactionManager";

export const ReactionEdit = () => {
  const { reactionId } = useParams();
  const navigate = useNavigate();
  const [reaction, updateTheReaction] = useState({
    id: 0,
    label: "",
    emoji: "",
  });

  useEffect(() => {
    getReactionById(reactionId).then((singleReaction) => {
      updateTheReaction(singleReaction);
    });
  }, []);

  return (
    <form className="TagForm">
      <h1 className="title is-3">Edit this Reaction</h1>

      <div className="field">
        <label class="label is-medium" htmlFor="ReactionLabel">
          Reaction label:{" "}
        </label>
        <div class="control">
          <input
            class="input is-medium"
            type="text"
            id="ReactionLabel"
            value={reaction.label}
            required
            autoFocus
            placeholder="Reaction name"
            onChange={(evt) => {
              const copy = { ...reaction };
              copy.label = evt.target.value;
              updateTheReaction(copy);
            }}
          />
        </div>
      </div>
      <div className="field">
        <label class="label is-medium" htmlFor="ReactionEmoji">
          Reaction emoji:{" "}
        </label>
        <div class="control">
          <input
            class="input is-medium"
            type="text"
            id="ReactionEmoji"
            value={reaction.emoji}
            required
            autoFocus
            placeholder="Reaction name"
            onChange={(evt) => {
              const copy = { ...reaction };
              copy.emoji = evt.target.value;
              updateTheReaction(copy);
            }}
          />
        </div>
      </div>

      <div class="control">
        <button
          class="button"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            editReaction(reaction).then(navigate("/reactions"));
          }}
        >
          Save Reaction
        </button>
      </div>
    </form>
  );
};
