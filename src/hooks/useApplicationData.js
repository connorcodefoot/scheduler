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
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      });
  }, []);

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(id, 'remove')

    setState({
      ...state,
      appointments,
      days,
    });

    return Axios.put(`/api/appointments/${id}`, { interview })
  }


  function cancelInterview(id) {

    const days = updateSpots(id, 'add')

    setState({
      ...state,
      days,
    });

    return Axios.delete(`/api/appointments/${id}`);
  }

  function updateSpots(id, action) {

    const stateCopy = {...state}
    
    stateCopy.days.forEach((day) => {
    
      if(day.appointments.includes(id) && action === 'remove') {
        day.spots--
      }

      if(day.appointments.includes(id) && action === 'add') {
        day.spots++
      }
      
    })
    return stateCopy.days
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}