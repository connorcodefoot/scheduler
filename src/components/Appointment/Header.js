import React from "react";

// Shows on all appointments, capturing the time and stylistically separating out each appointment
export default function Header(props) {
  return (<header className="appointment__time">
    <h4 className="text--semi-bold">{props.time}</h4>
    <hr className="appointment__separator" />
  </header>);
}