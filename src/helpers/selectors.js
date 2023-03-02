

// Synthesize data from API to ensure that it conforms to function requirements within the application
export function getAppointmentsForDay(state, day) {

  let appointments = [];

  state.days.forEach(d => {
    if (d.name === day) {
      appointments = d.appointments;
    } else {
      return appointments;
    }
  });

  let appointmentObjects = [];

  appointments.forEach(appointment => {
    appointmentObjects.push(state.appointments[appointment]);
  });

  return appointmentObjects;
}

// { student: "Archie Cohen", interviewer: 2 }



export function getInterview(state, interview) {

  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  } else return null;

}


export function getInterviewersByDay(state, day) {

  let interviewers = [];

  state.days.forEach(d => {
    if (d.name === day) {
      interviewers = d.interviewers;
    } else {
      return interviewers;
    }
  });

  let interviewerObjects = [];

  interviewers.forEach(interviewer => {
    interviewerObjects.push(state.interviewers[interviewer]);
  });

  return interviewerObjects;

}