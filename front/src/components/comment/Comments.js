import React  from "react";
import {  useDispatch } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import userService from "../../services/user.service";
import './comment.css'
import { getPost } from "../../actions/post";
import { useState, useEffect } from "react";


const Comments = ({ comments, currentUserId,postId }) => {
  const [backendComments, setBackendComments] = useState(comments);
  const [activeComment, setActiveComment] = useState(null);
  const dispatch=useDispatch()
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.repliesId === null
  );
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.repliesId === commentId)
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
  const addComment =  (text, repliesId) => {
    const  messageToSend={
        message:text,
        repliesId:repliesId,
        posts:postId,
        userId:currentUserId
    }
    userService.addComment(messageToSend).then(async(comment) => {
       dispatch(getPost())
    
      setActiveComment(null);
    });
  };

  useEffect(() => {
    setBackendComments(comments);
}, [comments])
  
  const deleteComment = (commentId) => {
    
    userService.deleteComment(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        dispatch(getPost())
        setBackendComments(updatedBackendComments)
        
      });
    
  };

  

  return (
    <div className="comments">
      <h3 className="comments-title">Commentaire</h3>
      <div className="comment-form-title">Ecrire un commentaire</div>
      <CommentForm submitLabel="Ecrire" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            currentUserId={currentUserId}

          />
        ))}
      </div>
    </div>
  );
};

export default Comments;