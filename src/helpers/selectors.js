// return all appointments for the day that passed in
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

// return all interviewers for the day that passed in
export function getInterviewersForDay(state, day) {
  if (!state.days || state.days.length === 0) {
    return [];
  }

  const matchedDay = state.days.filter(
    (dayInState) => dayInState.name === day
  )[0];
  if (!matchedDay) return [];

  const interviewers = [];
  matchedDay.interviewers.map((id) => {
    if (state.interviewers[id]) {
      interviewers.push(state.interviewers[id]);
    }
  });
  return interviewers;
}

// get the interview details info for the interviewer's id that passed in
export function getInterview(state, interview) {
  return interview
    ? { ...interview, interviewer: state.interviewers[interview.interviewer] }
    : null;
}

export function getSpotsPerDay(state, day) {
  const appointments = getAppointmentsForDay(state, day.name);
  const bookAppointments = appointments.filter(
    (appointment) => appointment.interview !== null
  );
  const openSpots = appointments.length - bookAppointments.length;

  return openSpots;
}
