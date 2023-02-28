import { useEffect } from "react";
import React from "react";
import Axios from "axios";
import { useState } from "react";



export default function useApplicationData() {

  const setDay = day => { setState({ ...state, day }); };

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {

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
    });
    return Axios.put(`/api/appointments/${id}`, { interview });
  }


  function cancelInterview(id) {

    return Axios.delete(`/api/appointments/${id}`);
  }

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
        });
      });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  }
}