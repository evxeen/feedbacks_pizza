import React from "react";
import classNames from "classnames";

export function Guest({ guest, listHidden, setListHidden }) {
  return (
    <>
      <div
        onClick={() => setListHidden(true)}
        className={classNames("member", {
          disabled: !guest.eatsPizza,
          vegan: guest.isVegan,
          hide: listHidden,
        })}
      >
        <p>{guest.name}</p>
      </div>
    </>
  );
}
