import {all} from 'redux-saga/effects';
import commonSaga from './readcomment/saga';

export default function* rootSaga(getState) {
	yield all([
		commonSaga()
	]);
}
