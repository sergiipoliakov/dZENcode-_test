import { combineReducers } from 'redux';

// Reducers
import orders from '../pages/Orders/reducers/order.rd';

const store = combineReducers({
  orders
});

export default (state: ReturnType<typeof store>, action: { type: string }): ReturnType<typeof store> => {
	if (action.type === 'LOG_OUT') return store({}, action);
	return store(state, action);
};
