import React from 'react'
import 'antd/dist/antd.css'
import './comment.css'
import { Row, Col, Button, Input,Avatar } from 'antd'
import { bindActionCreators } from "redux";
import { delComment, insertReply} from "../../Redux/commentApi/actions";
import connect from "react-redux/es/connect/connect";
class CommentChild extends React.Component {
  state = {
    showReplyButton: false,
    replyText: ''
  }
  onInputReplyChange = (e) => {
    if (e.target.value) {
      this.setState({ showReplyButton: true, replyText: e.target.value })
    }
    else this.setState({ showReplyButton: false, replyText: e.target.value })
  }
  sendReply = () => {
    const params = {
      commentId:this.props.commentId,
      replyText:this.state.replyText
    }
    this.props.insertReply(params)
  }
  delReply = () => {
    this.setState({ showReplyButton: false, replyText: '' })
  }
  delCommentSubmit = () => {
    this.props.delComment(this.props.commentId)
  }
  resolveComment = () => {
    alert(`Resolve Comment '${this.props.commentId}'`)
  }

  render() {
    const { modifiedDate, name, profileImage,comment, resolveStatus,lastcomment } = this.props
    const { showReplyButton, replyText } = this.state
    return (
      <div className="commentChild-parent">
        <Row className='commentChild-top' align="middle" type='flex'>
          <Col span={1}>
            <Avatar src={profileImage} size='large'/>
          </Col>
          <Col span={7}  className='comment-name-page'>
            <p className='comment-name-style'>{name}</p>
            <p className='comment-date-style'>{modifiedDate}</p>
          </Col>
          <Col span={2} offset={12}>
            {resolveStatus &&
            <Button type="danger"
                    onClick={this.delCommentSubmit}
            >Delete</Button>}
          </Col>
          <Col span={2}>
            {resolveStatus &&
            <Button
              onClick={this.resolveComment}
            >Resolve</Button>}
          </Col>
        </Row>
        <p className='comment-comment-style'>{comment}</p>
        {
          lastcomment &&
          <div>
            <Input
              placeholder='Reply...'
              value={replyText}
              onChange={this.onInputReplyChange}
            />
            {showReplyButton &&
            <Row type='flex' className='comment-reply-section'>
              <Col span={2}>
                <Button type="primary"
                        onClick={this.sendReply}
                >Reply</Button>
              </Col>
              <Col span={2}>
                <Button
                  onClick={this.delReply}
                >Cancel</Button>
              </Col>
            </Row>}
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  isLoadingList: state.common.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    delComment,
    insertReply
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentChild);