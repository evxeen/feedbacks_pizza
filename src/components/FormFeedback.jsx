import React, { useEffect, useState } from "react";

export function FormFeedback({ name, setFeedback, cancel }) {
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [commentDirty, setCommentDirty] = useState(false);
  const [phoneError, setPhoneError] = useState(
    "The field with the phone number is required"
  );
  const [commentError, setCommentError] = useState(
    "The comment field is required"
  );
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (phoneError || commentError) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [phoneError, commentError]);

  const submitForm = (e) => {
    e.preventDefault();
    setFeedback({ name, phone, comment });
    cancel();
  };

  const phoneHandler = (e) => {
    setPhone(e.target.value);
    const res = /^(\s*)?(\+)?([()+]?\d[()+]?){3,10}(\s*)?$/;
    if (!res.test(String(e.target.value).toLowerCase())) {
      setPhoneError("Enter the phone number correctly");
    } else {
      setPhoneError("");
    }
  };

  const commentHandler = (e) => {
    setComment(e.target.value);
    if (e.target.value.length === 0) {
      setCommentError("The comment field is required");
    } else {
      setCommentError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "phone":
        setPhoneDirty(true);
        break;
      case "comment":
        setCommentDirty(true);
        break;
    }
  };

  return (
    <div className="feedback-form">
      <form>
        <div className="container-form">
          <div>
            <h3>Name</h3>
            {name}
          </div>

          <div>⭐ ⭐ ⭐️️</div>

          <div>
            <h3>Phone</h3>
            <input
              onChange={(e) => phoneHandler(e)}
              onBlur={(e) => blurHandler(e)}
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
            />
            {phoneDirty && phoneError && (
              <div style={{ color: "red" }}>{phoneError}</div>
            )}
          </div>
          <div>
            <h3>Comment</h3>
            <textarea
              onChange={(e) => commentHandler(e)}
              value={comment}
              onBlur={(e) => blurHandler(e)}
              name="comment"
              placeholder="Write a comment"
            />
            {commentDirty && commentError && (
              <div style={{ color: "red" }}>{commentError}</div>
            )}
          </div>
          {valid ? (
            <button onClick={(e) => submitForm(e)}>Save</button>
          ) : (
            <button onClick={cancel}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}
