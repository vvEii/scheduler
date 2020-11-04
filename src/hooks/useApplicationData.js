import { useEffect, useReducer } from 'react';
import axios from 'axios';

const GET_DAYS = '/api/days';
const GET_APPOINTMENTS = '/api/appointments';
const GET_INTERVIEWERS = '/api/interviewers';
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW: {
      const appointments = {
        ...state.appointments,
        [action.id]: {
          ...state.appointments[action.id],
          interview: action.interview,
        },
      };
      const days = [];
      // update remaining spots
      state.days.map((day) => {
        if (day.name === state.day) {
          if (action.updateSpots) {
            let currentDay;
            const spots = action.interview ? day.spots - 1 : day.spots + 1;
            currentDay = { ...day, spots };
            days.push(currentDay);
          } else {
            days.push(day);
          }
        } else {
          days.push(day);
        }
      });

      return {
        ...state,
        days,
        appointments,
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {
  // useStaste:
  // const [state, setState] = useState({
  //   day: 'Monday',
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });

  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // establish websocket connection
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = () => socket.send('ping');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type) {
        // updateSpots indicates that if the reducer needs change the remaining spots of state
        // it is needed to only change remainning spots once per operation
        const action = { ...data, updateSpots: true };
        dispatch(action);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS),
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        });
        // useState:
        // setState((prev) => ({
        //   ...prev,
        //   days: all[0].data,
        //   appointments: all[1].data,
        //   interviewers: all[2].data,
        // }));
      })
      .catch((err) => console.log(err));
  }, []);

  const setDay = (day) => {
    // setState({ ...state, day });
    dispatch({
      type: SET_DAY,
      day,
    });
  };

  const cancelInterview = (id) => {
    return (
      axios
        .delete(`/api/appointments/${id}`)
        // be careful with setState(), it only accepts a single parameter;
        // if setState(...state,days,appointments) would throw a error
        // .then(() => setState({ ...state, days, appointments }))
        .then(() =>
          dispatch({
            type: SET_INTERVIEW,
            id,
            interview: null,
            updateSpots: false,
          })
        )
    );
  };

  const bookInterview = (id, interview) => {
    // in order to pass the new appointment in api parameters
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return (
      axios
        .put(`/api/appointments/${id}`, appointment)
        // .then(() => setState({ ...state, days, appointments }));
        .then(() => {
          dispatch({ type: SET_INTERVIEW, id, interview, updateSpots: false });
        })
    );
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
