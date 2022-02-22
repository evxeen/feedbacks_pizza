import React from "react";
import classNames from "classnames";

export function Guest({ guest, listHidden, showForm, showView }) {
  return (
    <>
      {guest.feedback ? (
        <div
          onClick={() => showView(guest.name)}
          className={classNames("member", {
            disabled: !guest.eatsPizza,
            vegan: guest.isVegan,
            hide: listHidden,
          })}
        >
          <p>
            {guest.feedback ? "✅ " : ""}
            {guest.name}
          </p>
        </div>
      ) : (
        <div
          onClick={() => showForm(guest.name)}
          className={classNames("member", {
            disabled: !guest.eatsPizza,
            vegan: guest.isVegan,
            hide: listHidden,
          })}
        >
          <p>
            {guest.feedback ? "✅ " : ""}
            {guest.name}
          </p>
        </div>
      )}
    </>
  );
}
