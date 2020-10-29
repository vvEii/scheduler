export function getAppointmentsForDay(state, day) {
  if (!state.days || state.days.length === 0) {
    return [];
  }
  const matchedDay = state.days.filter(
    (dayInState) => dayInState.name === day
  )[0];
  if (!matchedDay) return [];

  const appointments = [];
  matchedDay.appointments.map((id) => {
    if (state.appointments[id]) {
      appointments.push(state.appointments[id]);
    }
  });

  return appointments;
}

// 1: { id: 1, time: '12pm', interview: null }

// //  1: {
//   id: 1,
//   name: 'Sylvia Palmer',
//   avatar: 'https://i.imgur.com/LpaY82x.png',
// }

// "interviewer": {
//   "id": 1,
//   "name": "Sylvia Palmer",
//   "avatar": "https://i.imgur.com/LpaY82x.png"
// }

//interview is null or id
//state.interviewers
export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    const result = { ...interview, interviewer };
    return result;
  }
  return null;
}
