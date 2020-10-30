import React from 'react';
import 'components/Appointment/style.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './Form.js';
import Status from './Status.js';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onCancel = () => {
    back();
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
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
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          name={props.name}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status />}
    </article>
  );
};

export default Appointment;
