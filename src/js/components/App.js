import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import 'antd/dist/antd.css';
import { realData2 } from './commentUI/data'
import {
  getCommentList,
  getGoogleToken
} from "../Redux/commentApi/actions";
import './App.css';
import CommentSection from "./commentUI";

class App extends Component {
  componentDidMount() {
    this.props.getGoogleToken()
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.tokenStatus !== this.props.tokenStatus)
      this.props.getCommentList()
  }
  render() {
    return (
      <div className="parent_div">
        {realData2.items.map((item, commentId) =>
          item.status === 'open' && item.content &&
          <CommentSection key={commentId} comment={item} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoadingList: state.common.isLoading,
  commentList: state.common.commentList,
  tokenStatus: state.common.tokenStatus
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    getCommentList,
    getGoogleToken
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
