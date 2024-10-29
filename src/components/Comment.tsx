import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import config from '../../config/index';
import { CommentType } from "../types/comment";
import UpdateCommentForm from './UpdateCommentForm';

const Comment = ({ comment, comments, setComments }: { comment: CommentType, comments: CommentType[], setComments: React.Dispatch<React.SetStateAction<CommentType[]>> }) => {
  const [showForm, setShowForm] = useState(false);
  const { mail, message, id } = comment;

  const { baseUrl } = config;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { fetchData } = useFetch(`${baseUrl}/api/comments/${id}`, options);

  const handleDelete = async () => {
    await fetchData(options);

    function removeCommentById(arr: CommentType[], id: string) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1); return arr;
    }

    const lastComments = removeCommentById(comments, id);
    console.log('Comment last comments', lastComments);
    setComments([...lastComments]);
  }

  console.log('Comment', comments);

  const handleEdit = () => {
    setShowForm(true);
  }

  return (
    <div className="max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[960px] p-4 rounded-lg">
      <div className="text-slate-200">
        <h2 className="font-bold">{mail}</h2>
        <p className="text-sm">{message}</p>
      </div>
      <div className="flex">
        <div className="button-purple flex align-middle mt-4 mx-2 md:mt-8 w-[148px]">
          <button
            className="bg-background rounded-full p-1 w-full m-0.5"
            type="button"
            onClick={() => handleEdit()}
          >
            Edit
          </button>
        </div>
        <div className="button-orange flex align-middle mt-4 mx-2 md:mt-8 w-[148px]">
          <button
            className="bg-background rounded-full p-1 w-full m-0.5"
            type="button"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
        </div>
      </div>
      <UpdateCommentForm
        showForm={showForm}
        setShowForm={setShowForm}
        mail={mail}
        message={message}
        id={id}
        comments={comments}
        setComments={setComments} />
    </div>
  );
};

export default Comment;
