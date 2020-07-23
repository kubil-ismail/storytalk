/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  location: [],
  shareLocation: false,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
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
    // Default
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
