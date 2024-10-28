import Comment from './Comment';
import { CommentType } from '../types/comment';
import React from 'react';

const CommentList: React.FC<{ comments: CommentType[] }> = ({ comments }) => {
  return (
    <div className="form-container max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[960px] p-px rounded-xl">
      <div className="text-slate-200 bg-background rounded-xl p-4">
      { comments.length > 0 &&
        comments.map((comment: CommentType) => <Comment key={comment.id} comment={comment} />)
      }
      </div>
    </div>
  )
};              
              
export default CommentList;
