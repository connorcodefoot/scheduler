
const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3], 
      interviewers: [1, 2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};


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