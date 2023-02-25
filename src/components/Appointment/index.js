import React, { Fragment } from 'react'
import "../Appointment/styles.scss"
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"




export default function Appointment (props) {

  return (
    <article className="appointment">
    <Fragment>
    <Header time={props.time}/>
    {props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student}/> : <Empty />}
    </Fragment>
    </article>
  )}