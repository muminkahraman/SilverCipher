export const initialState = {
  username: null,
  email: null,
  tel: null,
  password: null,
  privateKey: null,
  repertoire: [],
  passwordAccepted: false
};

function reducer(state, action) {
  console.log(action)

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        tel: action.payload.email,
        password: action.payload.password,
        privateKey: action.payload.privateKey,
      };

    case 'SET_PASSWORD_ACCEPTED':
      return {
        ...state,
        passwordAccepted: action.payload.passwordAccepted
      };

    case 'RESET':
      return {
        ...state,
        username: null,
        email: null,
        tel: null,
        password: null,
        privateKey: null,
        repertoire: [],
        passwordAccepted: false      
      };

    default:
      return state;
  }
}

export default reducer;
