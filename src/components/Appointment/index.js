import React, { Fragment } from 'react';
import "../Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(STATUS)
    props.bookInterview(props.id, interview)
    .then(() => {
      return transition(SHOW)
    })
  }

  return (
    <article className="appointment">
      <Fragment>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form
          interviewers={props.interviewers}
          interviewer={''}
          value={''}
          student={''}
          onCancel={() => back(EMPTY)}
          onSave={save}
          />
        )}
        {mode === STATUS && (
          <Status
          message={props.message}
          />
        )}
      </Fragment>
    </article>
  );
}