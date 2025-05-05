import { SET_ORDER_ID } from '../constants';

export function setOrderId(orderId: string): any {
	return {
		type: SET_ORDER_ID,
		payload: {
			orderId
		}
	};
}
