import { useCallback } from "react";
import { useState } from "react";
import { ButtonB } from "./ButtonB";

type ButtonProps = {
  text?: string;
  children?: string;
};

export function Button({ text = "default", children }: ButtonProps) {
  let [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
    console.log("dentro da f.increment - " + counter);
    setCounter(counter + 1);
  }, [counter]);

  return (
    <>
      <button onClick={increment}>{counter}</button>
      <ButtonB>ButtonB</ButtonB>
    </>
  );
}
