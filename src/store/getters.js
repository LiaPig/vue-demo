const getters = {
  token: state => state.user.token,
  userName: state => state.user.userName,
  idCard: state => state.user.idCard,
  role: state => state.user.role
};

export default getters
