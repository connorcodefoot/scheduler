
import { useState } from "react";
import React from "react";


export default function useVisualMode (initial) {

  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {

        
    if(replace) {

      console.log("Start of replace:", history)
      setMode(mode)
      history.pop()
      history.push(mode)
      setHistory(history)
      console.log("End of replace:", history)


    } else {

      console.log("Start of normal transition", history)
      setMode(mode)
      history.push(mode)
      setHistory(history)
      console.log("End of normal transition:", history)

    }
  }

  function back () {

    console.log("Start of back:", history)
    history.pop()
    setMode(history[history.length - 1])
    console.log(mode)
    console.log("End of back:", history)

  }

  return { mode, transition, back}
}


// [initial, transition, transition, transition, transition, transition]