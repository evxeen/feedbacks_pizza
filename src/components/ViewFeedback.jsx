import React from "react";

export function ViewFeedback({ feedbackData, cancel, deleteFeedback }) {
  return (
    <div className="feedback-form">
      <button onClick={cancel}>⬅️</button>
      <button onClick={() => deleteFeedback(feedbackData.name)}>Delete</button>
      <div>
        <p>Name</p>
        <p>{feedbackData.name}</p>
      </div>
      <div>stars</div>
      <div>
        <p>Phone</p>
        <p>{feedbackData.phone}</p>
      </div>
      <div>
        <p>Comment</p>
        <p>{feedbackData.comment}</p>
      </div>
    </div>
  );
}
