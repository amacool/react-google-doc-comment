import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fileId, API_KEY, Client_ID } from "../../validation";
import {
  getCommentListSuccess,
  getCommentListFailed,
  delCommentSuccess,
  delCommentFailed,
  insertReplySuccess,
  insertReplyFailed,
  getGoogleTokenSuccess, getGoogleTokenFailed,
} from "./actions";

import {
  GET_COMMENT_LIST_REQUEST,
  DEL_COMMENT_REQUEST,
  INSERT_REPLY_REQUEST,
  GET_GOOGLE_TOKEN
} from "../constants";

function* getCommentList() {
  let res = yield new Promise((resolve) => {
    window.gapi.client.drive.comments.list({
      "fileId": fileId
    })
      .then(function (response) {
          console.log("Response", response);
          resolve(response)
        },
        function (err) {
          console.error("Execute error", err);
          resolve(false);
        });
  });
  if (res) {
    yield put(getCommentListSuccess(res));
  } else {
    yield put(getCommentListFailed());
  }
}

export function* watchLoadCommentList() {
  yield takeEvery(GET_COMMENT_LIST_REQUEST, getCommentList);
}

function* delComment(commentId) {
  let res = yield new Promise((resolve) => {
    window.gapi.client.drive.comments.delete({
      "fileId": fileId,
      "commentId": commentId.params
    })
      .then(function (response) {
          console.log("Response", response);
          resolve(response)
        },
        function (err) {
          console.error("Execute error", err);
          resolve(false)
        });
  });
  if (res) {
    yield put(delCommentSuccess(res));
  } else {
    yield put(delCommentFailed());
  }
}

export function* watchDelComment() {
  yield takeEvery(DEL_COMMENT_REQUEST, delComment);
}

function* insertReply(params) {
  console.log('asdfasdfasfasdf',params)
  let res = yield new Promise((resolve) => {
    window.gapi.client.drive.replies.insert({
      "fileId": fileId,
      "commentId": params.params.commentId,
      "resource": {
        "content": params.params.replyText
      }
    })
      .then(function (response) {
          // Handle the results here (response.result has the parsed body).
          resolve(response)
          console.log("Response", response);
        },
        function (err) {
          resolve(false)
          console.error("Execute error", err);
        });
  })
  if (res) {
    yield put(insertReplySuccess(res));
  } else {
    yield put(insertReplyFailed());
  }
}

export function* watchInsertReply() {
  yield takeEvery(INSERT_REPLY_REQUEST, insertReply);
}

/**
 * google comment api
 * @returns {IterableIterator<*>}
 */
function* googleToken() {
  let res = yield new Promise((resolve) => {
    window.gapi.load("client:auth2", () => {
      window.gapi.auth2.init({ client_id: Client_ID }).then(() => {
        window.gapi.auth2.getAuthInstance()
          .signIn({ scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly" })
          .then((res) => {
              localStorage.setItem('googleUser_token', res.Zi.access_token)
              window.gapi.client.setApiKey(API_KEY);
              window.gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v2/rest")
                .then(() => {
                    resolve(true);
                  },
                  function (err) {
                    console.error("Error loading GAPI client for API", err);
                    resolve(false);
                  });
            },
            function (err) {
              console.error("Error signing in", err);
              return false;
            });
      });
    });
  });
  if (res) {
    yield put(getGoogleTokenSuccess());
  } else {
    yield put(getGoogleTokenFailed());
  }
}

export function* watchGoogleToken() {
  yield takeEvery(GET_GOOGLE_TOKEN, googleToken);
}


export default function* commonSaga() {
  yield all([
    fork(watchDelComment),
    fork(watchInsertReply),
    fork(watchGoogleToken),
    fork(watchLoadCommentList)
  ]);
}
