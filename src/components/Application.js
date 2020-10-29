import React, { useState, useEffect } from 'react';

import 'components/Application.scss';
import DayList from './DayList';
import Appointment from './Appointment/index.js';
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 3,
    time: '2pm',
    interview: {
      student: 'Cooper Shang',
      interviewer: {
        id: 2,
        name: 'Sven Jones',
        avatar: 'https://i.imgur.com/twYrpay.jpg',
      },
    },
  },
  {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Fable',
      interviewer: {
        id: 5,
        name: 'Tori Malcolm',
        avatar: 'https://i.imgur.com/Nmx0Qxo.png',
      },
    },
  },
  {
    id: 5,
    time: '4:40pm',
    interview: {
      student: 'Winnie Zhao',
      interviewer: {
        id: 2,
        name: 'Sven Jones',
        avatar: 'https://i.imgur.com/twYrpay.jpg',
      },
    },
  },
];

export default function Application(props) {
  const [day, setDay] = useState('Monday');
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8001/api/days')
      .then((res) => {
        setDays(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>
      <section className='schedule'>
        {appointments.map((appointment) =>
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
