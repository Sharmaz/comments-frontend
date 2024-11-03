export interface CommentType {
  id: string;
  mail: string;
  message: string;
  createdAt: string;
}

export type UpdateCommentType = Pick<CommentType, 'mail' | 'message'>;
