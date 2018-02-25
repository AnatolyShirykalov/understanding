import {combineReducers} from 'redux';
import calculus from './calculus';
import bool from './bool';
import lesson from './lesson';
import tests from './tests';
import test from './test';
import error from './error';

export default combineReducers({calculus, bool, lesson, tests, test, error});
