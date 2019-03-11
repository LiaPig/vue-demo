const getters = {
  token: state => state.user.token,
  loginName: state => state.user.loginName,
  role: state => state.user.role
};

export default getters
