import React from 'react';
import 'components/Appointment/style.scss';
import Header from './Header.js';
import Empty from './Empty.js';
import Show from './Show.js';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './Form.js';
import Status from './Status.js';
import Confirm from './Confirm.js';
import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

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
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        transition(ERROR_SAVE, true);
      });
  };

  const onConfirm = () => {
    transition(CONFIRM);
  };

  const onDelete = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((err) => {
        // ----------------why got a error?? state is not iterable
        console.log(err);
        transition(ERROR_DELETE, true);
      });
  };

  const onEdit = () => {
    transition(EDIT);
  };

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onConfirm}
          onEdit={onEdit}
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
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={onCancel}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onCancel={() => back()}
          onConfirm={onDelete}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message='Could not save appointment.' onClose={onCancel} />
      )}
      {mode === ERROR_DELETE && (
        <Error message='Could not cancel appointment.' onClose={onCancel} />
      )}
    </article>
  );
};

export default Appointment;
