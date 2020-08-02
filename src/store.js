import {createStore} from 'redux';
import send from './reducers/send';

const store=createStore(send)
export default store