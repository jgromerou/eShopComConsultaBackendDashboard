export const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case '[AUTH] - LOGIN':
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
        isLoading: false,
        errorMessage: '',
      };

    case '[AUTH] - ERROR':
      return {
        ...state,
        user: null,
        isLogged: false,
        isLoading: false,
        errorMessage: action.payload.errorMessage,
      };

    case '[AUTH] - LOGOUT':
      return {
        ...state,
        user: null,
        isLogged: false,
        isLoading: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};
