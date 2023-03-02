import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";




// Represents the list of interviewers seen for each appointment (Select new or edit appointment)
export default function InterviewerList(props) {

  

  const listOfInterviewers = props.interviewers.map((interviewers) => {
    
    return <InterviewerListItem 
      key={interviewers.id}
      name={interviewers.name}
      avatar={interviewers.avatar}
      value={props.interviewer}
      selected={interviewers.id === props.interviewer}
      onChange={() => props.setInterviewer(interviewers.id)}
    />;
  });

  return (<section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{listOfInterviewers}</ul>
  </section>);

};