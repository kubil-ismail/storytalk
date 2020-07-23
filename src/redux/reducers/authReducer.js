/* eslint-disable prettier/prettier */
// Initial State
const initialState = {
  loggedIn: false,
  regist: false,
  uid: null,
  email: null,
  fullname: null,
  phone: null,
  newUser: false,
};

// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case 'LOGIN': {
      const { email, uid } = action.payload;
      return {
        ...state,
        ...{
          email,
          uid,
          loggedIn: true,
          regist: false,
          newUser: false,
        },
      };
    }
    // Sign Up
    case 'REGISTER': {
      const { email, uid } = action.payload;
      return {
        ...state,
        ...{
          email,
          uid,
          regist: true,
          newUser: true,
        },
      };
    }
    // Set Profile
    case 'ACCOUNT': {
      const { displayName, phoneNumber } = action.payload;
      return {
        ...state,
        ...{
          fullname: displayName,
          phone: phoneNumber,
        },
      };
    }
    // Login
    case 'LOGOUT': {
      return {
        ...state,
        ...{
          regist: false,
          newUser: false,
          loggedIn: false,
          email: false,
          uid: false,
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
