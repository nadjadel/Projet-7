import CommentForm from "./CommentForm";
import './comment.css'

import { Avatar } from "@material-ui/core";
const Comment = ({
  comment,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  currentUserId,
  role
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canDelete =
    (currentUserId === comment.userId.id||role==='ROLE_ADMIN') && (comment.children || []).length === 0 ;
  const canReply = Boolean(currentUserId);
 const date = new Date(comment.date).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <Avatar
        src={comment.userId.imageUrl}/>
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.userId.firstName+' '+comment.userId.lastName.substring(0,1)}</div>
          <div>{date}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.message}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Repondre
            </div>
          )}
          
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Effacer
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, comment.id)}
          />
        )}
        {(comment.children).length > 0 && (
          <div className="replies">
            {(comment.children || []).filter(x=>x.userId.isActive===true).map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                deleteComment={deleteComment}
                addComment={addComment}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;