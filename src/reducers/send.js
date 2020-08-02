// import {createStore} from 'redux';

export default (state=10, action) => {
    switch (action.type) {
      case 'send':
          // console.log(action.payload)
        return action.payload
      default:
        return state
    }
}