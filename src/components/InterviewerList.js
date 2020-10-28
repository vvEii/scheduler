import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss'

const InterviewerList = (props) => {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {props.interviewers.map((interviewer) => (
          <InterviewerListItem 
          name = {interviewer.name}
          avatar = {interviewer.avatar}
          selected = {interviewer.id === props.interviewer}
          setInterviewer = {event => props.setInterviewer(interviewer.id)}
          key = {interviewer.id}
          />
        ))}
      </ul>
    </section>
  );
};
export default InterviewerList;
