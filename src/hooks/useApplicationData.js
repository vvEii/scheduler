import { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from 'components/Appointment';

export default function useApplicationData() {
  const GET_DAYS = 'http://localhost:8001/api/days';
  const GET_APPOINTMENTS = 'http://localhost:8001/api/appointments';
  const GET_INTERVIEWERS = ' http://localhost:8001/api/interviewers';

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const setDay = (day) => {
    setState({ ...state, day });
  };
  // const setDays = (days) => {
  //   //setState({ ...state, days });
  //   setState((prev) => ({ ...prev, days }));
  // };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [];
    console.log(state);
    state.days.map((day) => {
      if (day.name === state.day) {
        let currentDay;
        const spots = day.spots + 1;
        currentDay = { ...day, spots };
        days.push(currentDay);
      } else {
        days.push(day);
      }
    });

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => setState(...state, days, appointments));
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [];

    state.days.map((day) => {
      if (day.name === state.day) {
        let currentDay;
        const spots = day.spots - 1;
        currentDay = { ...day, spots };
        days.push(currentDay);
      } else {
        days.push(day);
      }
    });

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => setState({ ...state, days, appointments }));
    // ------------ ASK mentor what happend, if added a catch here?--------
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
