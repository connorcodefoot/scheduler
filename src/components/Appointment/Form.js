import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


// Represents a new or edited interview. This functionality will be the same for the aforementioned here, but will have different outcomes upon saving. See Appointments/index.js for the difference in functionality. 
export default function Form (props) { 

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    setError("")
    props.onCancel()
  }

  function submit() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value = {student}
        onChange={(event) => {setStudent(event.target.value)}}
        data-testid="student-name-input" 
      />
      <section className="appointment__validation">{error}</section>
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
      <Button danger  onClick={cancel}>Cancel</Button>
      <Button confirm onClick={submit}>Save</Button>
    </section>
  </section>
</main>
  )
}