// change BUTTON-UI to reflect submission-status-started
const errorSync = (obj) => ({
  type: 'ERROR_SYNC',
  payload: obj,
});
module.exports = {
  errorSync,
};
