export const END_POINT = {
  PROJECT: {
    BASE: `project/`,
    GET_LIST: () => `${END_POINT.PROJECT.BASE}get-project`,
    CREATE_PROJECT: () => `${END_POINT.PROJECT.BASE}create-project`,
  },
  AUTH: {
    BASE: `auth/`,
    LOGIN: () => `${END_POINT.AUTH.BASE}login`,
    SIGNUP: () => `${END_POINT.AUTH.BASE}signup`,
  },
};
