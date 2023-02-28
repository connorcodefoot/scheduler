import React, { useEffect } from "react";
import { useState } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import Axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors";

export default function Application(props) {

  const setDay = day => { setState({ ...state, day });}


  const [state, setState] = useState({
    day: '',
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    
    console.log(id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    })
    return Axios.put(`/api/appointments/${id}`, {interview})
  }
        

  function deleteInterview(id) {

    return Axios.delete(`/api/appointments/${id}`)
  }

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersByDay(state, state.day )

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        getInterview={getInterview}
      />
    );
  });

  useEffect(() => {

    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, []);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            day={state.day}
            days={state.days}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



