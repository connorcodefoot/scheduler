
import { useState } from "react";
import React from "react";


export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {

        
    if(replace) {
      
      setMode(mode)

    } else {
  
      setMode(mode)
      history.push(mode)
      setHistory(history)

    }
  }

  function back (mode) {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length-1])
    }
  }

  return { mode, transition, back}
}


// [initial, transition, transition, transition, transition, transition]