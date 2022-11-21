import { useState, useEffect } from "react";
import { getAllReactions } from "../../managers/ReactionManager";
import { Reaction } from "./Reaction";
import { ReactionForm } from "./ReactionForm";
// import "./Reactions.css"

export const ReactionList = () => {
  const [reactions, setReactions] = useState([]);
  const getReactions = () => {
    return getAllReactions().then((reactionsFromAPI) => {
      setReactions(reactionsFromAPI);
    });
  };

  useEffect(() => {
    getReactions();
  }, []);
  //Add the full list of tags and import the form function
  return (
    <div style={{ margin: "0rem 3rem" }}>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h1 class="title is-3">Reactions</h1>
              <section className="section">
                <article className="reactionList">
                  {reactions.map((reaction) => {
                    return <Reaction reaction={reaction} />;
                  })}
                </article>
              </section>
            </div>
            <div className="column is-two-fifths">
              <div class="box">
                {" "}
                <>
                  <ReactionForm getReactions={getReactions} />
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
