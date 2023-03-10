import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// Represents the interviewers that will show in the interviewList for a selected day
export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    " interviewers__item--selected": props.selected
  });

  return <li onClick={props.onChange} className={interviewerClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected ? props.name : ''}
  </li>;
}
