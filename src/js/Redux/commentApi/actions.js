import {
  GET_COMMENT_LIST_REQUEST,
  GET_COMMENT_LIST_SUCCESS,
  GET_COMMENT_LIST_FAILED,
  DEL_COMMENT_REQUEST,
  DEL_COMMENT_SUCCESS,
  DEL_COMMENT_FAILED,
  INSERT_REPLY_REQUEST,
  INSERT_REPLY_SUCCESS,
  INSERT_REPLY_FAILED,
  GET_GOOGLE_TOKEN,
  GET_GOOGLE_TOKEN_SUCCESS,
  GET_GOOGLE_TOKEN_FAILED
} from '../constants';

export const getCommentList = (params) => ({
  type: GET_COMMENT_LIST_REQUEST,
  params
});

export const getCommentListSuccess = (payload) => ({
  type: GET_COMMENT_LIST_SUCCESS,
  payload
});

export const getCommentListFailed = () => ({
  type: GET_COMMENT_LIST_FAILED
});

/*----Del----*/
export const delComment = (params) => ({
  type: DEL_COMMENT_REQUEST,
  params
});

export const delCommentSuccess = (payload) => ({
  type: DEL_COMMENT_SUCCESS,
  payload
});

export const delCommentFailed = () => ({
  type: DEL_COMMENT_FAILED
});

/*Insert Reply*/

export const insertReply = (params) => ({
  type: INSERT_REPLY_REQUEST,
  params
});

export const insertReplySuccess = (payload) => ({
  type: INSERT_REPLY_SUCCESS,
  payload
});

export const insertReplyFailed = () => ({
  type: INSERT_REPLY_FAILED
});

export const getGoogleToken = () => ({
  type: GET_GOOGLE_TOKEN
});

export const getGoogleTokenSuccess = () => ({
  type: GET_GOOGLE_TOKEN_SUCCESS
});

export const getGoogleTokenFailed = () => ({
  type: GET_GOOGLE_TOKEN_FAILED
});
