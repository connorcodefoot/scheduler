import React, { Fragment } from 'react';
import "../Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    transition(SAVING)

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then((res) => {
        if (res === 'error') {
          transition(ERROR_SAVE, true);
        }
        else {
          transition(SHOW);
        }
      });
  };

  function cancelInterview(id) {

    transition(DELETING, true);

    props.cancelInterview(id)
      .then((res) => {
        if (res === 'error') {
          return transition(ERROR_DELETE, true);
        }
        else {
          transition(EMPTY);
        }
      });
  }

  function editInterview(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    props.editInterview(props.id, interview)
      .then((res) => {
        if (res === 'error') {
          return transition(ERROR_SAVE, true);
        }
        else {
          return transition(SHOW);
        }
      });
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Fragment>
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            id={props.id}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
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
        {(mode === SAVING) && (
          <Status
            message="Saving"
          />
        )}
        {(mode === DELETING) && (
          <Status
            message="Deleting"
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
            onSave={editInterview}
          />
        )}

        {(mode === ERROR_DELETE || mode === ERROR_SAVE) && (
          <Error
            message={props.message}
            onClose={() => back()}
          />

        )}
      </Fragment>
    </article>
  );
}