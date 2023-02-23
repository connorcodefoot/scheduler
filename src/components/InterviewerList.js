import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {

  

  const listOfInterviewers = props.interviewers.map((interviewers) => {
    
    return <InterviewerListItem 
      id={interviewers.id}
      name={interviewers.name}
      avatar={interviewers.avatar}
      setInterviewer={props.setInterviewer}
      interviewer={props.interviewer}
      selected={interviewers.id === props.interviewer ? true : false}
    />;
  });

  return (<section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{listOfInterviewers}</ul>
  </section>);

};