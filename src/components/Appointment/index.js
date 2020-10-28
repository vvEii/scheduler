import React from 'react';
import 'components/Appointment/style.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';

const Appointment = (props) => {
  return (
    <article className='appointment'>
      <Header time={props.time} />
      {props.interview ? (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
};

export default Appointment;
