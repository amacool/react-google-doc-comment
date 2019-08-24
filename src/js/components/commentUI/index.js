import React from 'react'
import CommentChild from "./comment";
import './comment.css'

class CommentSection extends React.Component {
  render() {
    const { comment, delComment } = this.props
    return (
      <div className='comment-component-div-parent'>
        <p className='comment-header-text'>{comment.context ? comment.context.value : 'Marked as resolved'}</p>
        <div className='comment-component-div'>
          {
            <CommentChild
              commentId={comment.commentId}
              modifiedDate={comment.modifiedDate}
              name={comment.author.displayName}
              profileImage={comment.author.picture.url}
              comment={comment.content}
              resolveStatus={true}
              lastcomment={comment.replies.length === 0 ? true : false}
            />
          }
          {
            comment.replies && comment.replies.map((item, index) => (
              <CommentChild
                key={item.replyId}
                commentId={item.replyId}
                modifiedDate={item.modifiedDate}
                name={item.author.displayName}
                profileImage={item.author.picture.url}
                comment={item.content}
                resolveStatus={false}
                lastcomment={index === comment.replies.length - 1 ? true : false} />
            ))
          }
        </div>
      </div>
    )
  }
}

export default CommentSection