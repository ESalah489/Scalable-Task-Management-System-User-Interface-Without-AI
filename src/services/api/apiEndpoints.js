const API_ENDPOINTS = {
  TASKS: {
    GET_ALL: "/tasks",
    BY_ID: (id) => `/tasks/${id}`,
    POST_TASK: "/tasks",
    PUT_BY_ID: (id) => `/tasks/${id}`,
    DELETE_BY_ID: (id) => `/tasks/${id}`,
  },
};
export default API_ENDPOINTS;