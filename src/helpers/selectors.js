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

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    const result = { ...interview, interviewer };
    return result;
  }
  return null;
}
