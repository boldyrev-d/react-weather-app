import {
  DELETE_CITY,
  CHANGE_CITY,
  LOAD_CURRENT,
  LOAD_WEATHER,
  START,
  SUCCESS,
  FAIL,
  RESET_ERROR,
} from '../constants';
import { getWeatherByCity, getWeatherByLoc } from '../api';

export const loadWeather = name => (dispatch) => {
  dispatch({
    type: LOAD_WEATHER + START,
  });

  setTimeout(() => {
    getWeatherByCity(name)
      .then((response) => {
        dispatch({
          type: LOAD_WEATHER + SUCCESS,
          payload: {
            ...response,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_WEATHER + FAIL,
          payload: {
            text: error.message,
          },
        });
      });
  }, 300);
};

export const deleteCity = name => ({
  type: DELETE_CITY,
  payload: {
    name,
  },
});

export const changeCity = name => ({
  type: CHANGE_CITY,
  payload: {
    name,
  },
});

export const loadCurrent = () => (dispatch) => {
  dispatch({
    type: LOAD_WEATHER + START,
  });

  if ('geolocation' in navigator) {
    let currentLat;
    let currentLon;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLat = position.coords.latitude;
        currentLon = position.coords.longitude;

        setTimeout(() => {
          getWeatherByLoc(currentLat, currentLon).then((response) => {
            dispatch({
              type: LOAD_CURRENT + SUCCESS,
              payload: {
                ...response,
              },
            });
          });
        }, 300);
      },
      (error) => {
        if (error.code === 1) {
          dispatch({
            type: LOAD_CURRENT + FAIL,
            payload: {
              text: 'Geolocation is denied',
            },
          });
        }
        if (error.code === 2) {
          dispatch({
            type: LOAD_CURRENT + FAIL,
            payload: {
              text: 'No response received. Check internet connection',
            },
          });
        }
      },
    );
  } else {
    dispatch({
      type: LOAD_CURRENT + FAIL,
      payload: {
        text: 'Geolocation unavailablein browser',
      },
    });
  }
};

export const resetError = () => ({
  type: RESET_ERROR,
});
