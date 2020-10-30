import React, { useState, useEffect } from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment/index.js';
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

export default function Application(props) {
  const GET_DAYS = 'http://localhost:8001/api/days';
  const GET_APPOINTMENTS = 'http://localhost:8001/api/appointments';
  const GET_INTERVIEWERS = ' http://localhost:8001/api/interviewers';

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  let dailyAppointments = [];
  let dailyInterviewers = [];

  const setDay = (day) => {
    setState({ ...state, day });
  };
  // const setDays = (days) => {
  //   //setState({ ...state, days });
  //   setState((prev) => ({ ...prev, days }));
  // };
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
  console.log(state.days);
  dailyAppointments = getAppointmentsForDay(state, state.day);
  dailyInterviewers = getInterviewersForDay(state,state.day);
  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
            />
          );
        })}
        {<Appointment key='last' time='5pm' />}
      </section>
    </main>
  );
}
