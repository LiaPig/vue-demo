const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  role: state => state.user.role
};

export default getters
