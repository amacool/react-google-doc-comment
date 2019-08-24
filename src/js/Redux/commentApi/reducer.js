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
  GET_GOOGLE_TOKEN_SUCCESS,
  GET_GOOGLE_TOKEN_FAILED
} from "../constants";

const INIT_STATE = {
  isLoading: false,
  commentList: [],
  commentdelresult:{},
  insertReplyResult:{},
  tokenStatus: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMMENT_LIST_REQUEST:
      return {...state, isLoading: true};
    case GET_COMMENT_LIST_SUCCESS:
      return {...state, commentList: action.payload, isLoading: false};
    case GET_COMMENT_LIST_FAILED:
      return {...state, isLoading: false};

    case DEL_COMMENT_REQUEST:
      return {...state, isLoading: true};
    case DEL_COMMENT_SUCCESS:
      return {...state, commentdelresult: action.payload, isLoading: false};
    case DEL_COMMENT_FAILED:
      return {...state, isLoading: false};

    case INSERT_REPLY_REQUEST:
      return {...state, isLoading: true};
    case INSERT_REPLY_SUCCESS:
      return {...state, insertReplyResult: action.payload, isLoading: false};
    case INSERT_REPLY_FAILED:
      return {...state, isLoading: false};

    case GET_GOOGLE_TOKEN_SUCCESS:
      return {...state, tokenStatus: true};
    case GET_GOOGLE_TOKEN_FAILED:
      return {...state, tokenStatus: false};

    default:
      return {...state};
  }
};
