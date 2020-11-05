import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types';

const InterviewerList = (props) => {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {props.interviewers.map((interviewer) => (
          <InterviewerListItem
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.value}
            setInterviewer={(event) => props.onChange(interviewer.id)}
            key={interviewer.id}
          />
        ))}
      </ul>
    </section>
  );
};
// check interviewers type runtime
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
