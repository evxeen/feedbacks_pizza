import React from "react";

export function ViewFeedback({ feedbackData, cancel, deleteFeedback }) {
  return (
    <div className="view-form">
      <div className="view-form_container">
        <div className="view-form_buttons">
          <ul>
            <li>
              <button onClick={cancel}>🔙️</button>
            </li>
            <li>
              <button onClick={() => deleteFeedback(feedbackData.name)}>
                Delete
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3>Name</h3>
          <p>{feedbackData.name}</p>
        </div>
        <div>stars</div>
        <div>
          <h3>Phone</h3>
          <p>{feedbackData.phone}</p>
        </div>
        <div>
          <h3>Comment</h3>
          <p>{feedbackData.comment}</p>
        </div>
      </div>
    </div>
  );
}
