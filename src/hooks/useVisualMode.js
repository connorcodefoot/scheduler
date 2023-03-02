
import { useState } from "react";
import React from "react";

// This function centralizes the control of state for the appointment component
export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {

    if(replace) {

      setMode(mode)
      history.pop()
      history.push(mode)
      setHistory(history)


    } else {

      setMode(mode)
      history.push(mode)
      setHistory(history)

    }
  }

  function back () {

    history.pop()
    setMode(history[history.length - 1])

  }
  return { mode, transition, back}
}

// [initial, transition, transition, transition, transition, transition]