import React from 'react';
import 'components/Appointment/style.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './Form.js';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

const Appointment = (props) => {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onCancel = () => {
    back();
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} name={props.name} onCancel={onCancel}/>}
    </article>
  );
};

export default Appointment;
