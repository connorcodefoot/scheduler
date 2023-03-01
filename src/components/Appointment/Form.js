import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";




export default function Form (props) { 

  const [student, setStudent] = useState(props.student);
  const [interviewer, setInterviewer] = useState(props.interviewer);

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        student={student}
        type="text"
        placeholder="Enter Student Name"
        value = {student}
        onChange={(event) => {setStudent(event.target.value)}}
        data-testid="student-name-input"
      />
    </form>
    <InterviewerList
      interviewers={props.interviewers}
      interviewer={interviewer}
      value={props.interviewer}
      setInterviewer={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger  onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
    </section>
  </section>
</main>
  )
}