import {combineReducers} from 'redux';
import calculus from './calculus';
import bool from './bool';
import lesson from './lesson';

export default combineReducers({calculus, bool, lesson});
