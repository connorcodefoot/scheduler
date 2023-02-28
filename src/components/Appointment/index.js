import React, { Fragment } from 'react';
import "../Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(STATUS);
    props.bookInterview(props.id, interview)
      .then(() => {
        return transition(SHOW);
      });
  };

  function cancelInterview(id) {

    transition(STATUS);
    props.deleteInterview(id)
      .then(() => {
        return transition(EMPTY);
      });
  }

  function editInterview() {
    transition(EDIT)
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
            id={props.id}
            onDelete={() => transition(CONFIRM)}
            onEdit={editInterview}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            interviewer={''}
            value={''}
            student={''}
            onCancel={() => back()}
            onSave={save}
          />
        )}
        {mode === STATUS && (
          <Status
            message={props.message}
          />
        )}
        {mode === CONFIRM && (
          <Confirm
            onCancel={() => back()}
            onConfirm={cancelInterview}
            id={props.id}
            message={'Are you sure you want to delete this appointment?'}
          />
        )}
        {mode === EDIT && (
          <Form
            interviewers={props.interviewers}
            interviewer={props.interview.interviewer.id}
            value={props.interview.student}
            student={props.interview.student}
            onCancel={() => back()}
            onSave={save}
          />
        )}
      </Fragment>
    </article>
  );
}