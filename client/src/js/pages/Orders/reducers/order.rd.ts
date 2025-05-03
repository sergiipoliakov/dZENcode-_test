import { SET_ORDER_ID } from '../constants';
import { ReduxState } from '../types';

const initialState = {
  orderId: '',
};

export default function setOrderId(state = initialState as { orderId: string }, action: ReduxState): { orderId: string } {
  switch (action.type) {
    case SET_ORDER_ID:
      return {
        ...state,
        orderId: action?.payload?.orderId,
      };
    default:
      return state;
  }
}
