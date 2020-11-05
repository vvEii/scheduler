import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition mode based on the mode that passed in
  const transition = (mode, replace = false) => {
    if (!replace) {
      setHistory([...history, mode]);
      setMode(mode);
    } else {
      setMode(mode);
    }
  };

  // back to last mode
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      setMode(initial);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}
