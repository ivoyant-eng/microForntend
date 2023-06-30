import React, { useState } from "react";
const MyButton = () => {
  const [state, setState] = useState(0);

  return (
    <button
      onClick={() => {
        setState((prev) => prev + 1);
      }}
    >
      App1 Button {state}
    </button>
  );
};

export default MyButton;
