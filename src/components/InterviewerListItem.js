import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const interviewerItemClass = classNames('interviews__item', {
    'interviewers__item--selected': props.selected,
  });

  const itemImageClass = classNames('interviewers__item-image', {
    'interviewers__item-image--selected': props.selected,
  });

  return (
    <li
      className={interviewerItemClass}
      onClick={() => {
        props.setInterviewer(props.name);
      }}
    >
      <img className={itemImageClass} src={props.avatar} alt={props.name} />
      {props.selected ? props.name : ''}
    </li>
  );
};

export default InterviewerListItem;
