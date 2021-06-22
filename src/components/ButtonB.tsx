import { useCallback } from "react";
import { useState } from "react";

type ButtonProps = {
  text?: string;
  children?: string;
};

export function ButtonB({ text = "default", children }: ButtonProps) {
  let [clicked, setClicked] = useState(false);

  function handleClicked() {
    console.log("dentro da f.handleClicked - " + clicked);
    setClicked(!clicked);
  }
  return (
    <>
      <button onClick={handleClicked}>clicked</button>
    </>
  );
}
