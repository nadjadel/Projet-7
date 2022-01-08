import React  from "react";
import {  useDispatch } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import userService from "../../services/user.service";
import './comment.css'
import { getPost } from "../../actions/post";
import { useState, useEffect } from "react";


const Comments = ({ comments, currentUserId,postId,role }) => {
  const [backendComments, setBackendComments] = useState(comments);
  const [activeComment, setActiveComment] = useState(null);
  const dispatch=useDispatch()
  
  function createTree(list) {
    var map = {},
      node,
      roots = [],
      i
  
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i // initialize the map
      list[i].children = [] // initialize the children
    }
  
    for (i = 0; i < list.length; i += 1) {
      node = list[i]
      if (node.repliesId) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.repliesId]].children.push(node)
      } else {
        roots.push(node)
      }
    }
    return roots
  }
  
 
      
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
        {createTree(backendComments).map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            currentUserId={currentUserId}
            role={role}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;