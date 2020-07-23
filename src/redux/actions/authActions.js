/* eslint-disable prettier/prettier */

export const login = (request) => ({
  type: 'LOGIN',
  payload: request,
});

export const register = (request) => ({
  type: 'REGISTER',
  payload: request,
});

export const account = (request) => ({
  type: 'ACCOUNT',
  payload: request,
});

export const logout = (request) => ({
  type: 'LOGOUT',
  payload: request,
});
