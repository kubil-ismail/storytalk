/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  location: [],
  shareLocation: false,
  friends: [],
  friendsKey: [],
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Location
    case 'LOCATION': {
      const { location } = action.payload;
      return {
        ...state,
        ...{
          location,
          shareLocation: true,
        },
      };
    }
    case 'FRIENDS': {
      const { friends, friendsKey } = action.payload;
      return {
        ...state,
        ...{
          friends,
          friendsKey,
        },
      };
    }
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
