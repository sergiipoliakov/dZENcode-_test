import { ReduxState } from '../types';
import { SET_ORDER_ID } from '../constants';

export function order(payload: { orderId: string}): ReduxState {
	const { orderId } = payload;
	return {
		type: SET_ORDER_ID,
		payload: {
			orderId
		}
	};
}
