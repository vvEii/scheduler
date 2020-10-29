import React, { useState, useEffect } from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment/index.js';
import axios from 'axios';
import { getAppointmentsForDay } from '../helpers/selectors';

export default function Application(props) {
  const GET_DAYS = 'http://localhost:8001/api/days';
  const GET_APPOINTMENTS = 'http://localhost:8001/api/appointments';
  const GET_INTERVIEWERS = ' http://localhost:8001/api/interviewers';

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  let dailyAppointments = [];

  const setDay = (day) => {
    setState({ ...state, day });
  };
  // const setDays = (days) => {
  //   //setState({ ...state, days });
  //   setState((prev) => ({ ...prev, days }));
  // };
  useEffect(() => {
    Promise.all([axios.get(GET_DAYS), axios.get(GET_APPOINTMENTS)])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
        }));
      })
      .catch((err) => console.log(err));
  }, []);
  
  dailyAppointments =  getAppointmentsForDay(state, state.day);

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
        {dailyAppointments.map((appointment) =>
          appointment.interview ? (
            <Appointment key={appointment.id} {...appointment} />
          ) : (
            <Appointment time={appointment.time} key={appointment.id} />
          )
        )}
        {<Appointment key='last' time='5pm' />}
      </section>
    </main>
  );
}
