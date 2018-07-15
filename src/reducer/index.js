/* eslint-disable no-case-declarations */

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

const defaultState = {
  activeCity: '',
  cities: {},
  currentLocationWeather: {},
  loading: false,
  geolocation: false,
  error: {
    isError: false,
    text: '',
  },
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_WEATHER + START:
      return {
        ...state,
        loading: true,
      };

    case LOAD_WEATHER + SUCCESS:
      return {
        ...state,
        activeCity: payload.name,
        geolocation: false,
        cities: {
          ...state.cities,
          [payload.name]: {
            name: payload.name,
            weatherID: payload.weather[0].id,
            temp: payload.main.temp,
            humidity: payload.main.humidity,
            wind: payload.wind.speed,
            timestamp: Date.now(),
          },
        },
        loading: false,
        error: {
          isError: false,
          text: '',
        },
      };

    case LOAD_WEATHER + FAIL:
      return {
        ...state,
        loading: false,
        geolocation: false,
        error: {
          isError: true,
          text: payload.text,
        },
      };

    case DELETE_CITY:
      const cities = { ...state.cities };
      delete cities[payload.name];

      if (!state.geolocation) {
        return {
          ...state,
          activeCity: Object.keys(cities).length ? Object.keys(cities)[0] : '',
          cities,
        };
      }

      return {
        ...state,
        activeCity: '',
        cities,
      };

    case CHANGE_CITY:
      return {
        ...state,
        activeCity: payload.name,
        geolocation: false,
        error: {
          isError: false,
          text: '',
        },
      };

    case LOAD_CURRENT + SUCCESS:
      return {
        ...state,
        activeCity: '',
        geolocation: true,
        currentLocationWeather: {
          name: payload.name,
          weatherID: payload.weather[0].id,
          temp: payload.main.temp,
          humidity: payload.main.humidity,
          wind: payload.wind.speed,
          timestamp: Date.now(),
        },
        loading: false,
        error: {
          isError: false,
          text: '',
        },
      };

    case LOAD_CURRENT + FAIL:
      return {
        ...state,
        loading: false,
        activeCity: '',
        geolocation: true,
        error: {
          isError: true,
          text: payload.text,
        },
      };

    case RESET_ERROR:
      return {
        ...state,
        error: {
          isError: false,
          text: '',
        },
      };

    default:
      return state;
  }
};
