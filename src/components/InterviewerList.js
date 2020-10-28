import React from 'react';
import classNames from 'classnames';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {props.interviewers.map((interviewer) => (
          <InterviewerListItem 
          name = {interviewer.name}
          avatar = {interviewer.avatar}
          selected = {interviewer.name === props.name}
          setInterviewer = {props.setInterviewer}
          />
        ))}
      </ul>
    </section>
  );
};
export default InterviewerList;
