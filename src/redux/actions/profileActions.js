/* eslint-disable prettier/prettier */
export const location = (request) => ({
  type: 'LOCATION',
  payload: request,
});

export const friends = (request) => ({
  type: 'FRIENDS',
  payload: request,
});
