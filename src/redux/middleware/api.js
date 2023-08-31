import axios from 'src/utils/axios';
import * as actions from 'src/redux/api';

const api =
  ({dispatch}) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const {
      url,
      method,
      data,
      onStart,
      beforeSuccess,
      onSuccess,
      beforeFailure,
      onFailure,
    } = action.payload;

    if (onStart) dispatch(onStart());
    next(action);

    try {
      const response = await axios({
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSucceeded(response.data));

      if (beforeSuccess) dispatch(beforeSuccessAction());
      next(action);

      if (onSuccess) dispatch({type: onSuccess, payload: response.data});
    } catch (err) {
      if (beforeFailure) dispatch(beforeFailure());
      next(action);

      dispatch(actions.apiCallFailed(err.message));

      if (onFailure) dispatch({type: onFailure, payload: err.message});
    }
  };

export default api;
