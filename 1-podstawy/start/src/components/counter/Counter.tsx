import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prevState) => prevState + 1);
  };

  const decrement = () => {
    setCount((prevState) => prevState - 1);
  };

  return (
    <>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <span>count: {count}</span>
    </>
  );
};
