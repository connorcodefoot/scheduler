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

  // Get intial data from API
  useEffect(() => {

    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState({
          day: 'Monday',
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      });
  }, []);

  function editInterview(id, interview) {

    return Axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {

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
          appointments,
        });
      })
      .catch((err) => {return 'error'});
  }

  function bookInterview(id, interview) {

    return Axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {

        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment
        };

        const days = updateSpots(id, 'remove');

        setState({
          ...state,
          appointments,
          days
        });
      })
      .catch((err) => {return 'error'});
  }


  function cancelInterview(id) {

    return Axios.delete(`/api/appointments/${id}`)
      .then((res) => {

        const days = updateSpots(id, 'add');

        setState({
          ...state,
          days
        });

      })
      .catch((err) => {return 'error'});
  }

  function updateSpots(id, action) {

    const stateCopy = { ...state };

    stateCopy.days.forEach((day) => {

      if (day.appointments.includes(id) && action === 'remove') {
        day.spots--;
      }

      if (day.appointments.includes(id) && action === 'add') {
        day.spots++;
      }

    });
    return stateCopy.days;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview
  };
}