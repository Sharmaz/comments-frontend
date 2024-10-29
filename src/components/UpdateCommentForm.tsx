import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import config from '../../config/index';
import { CommentType } from '../types/comment';

const UpdateCommentForm = ({
  comments,
  setComments,
  showForm,
  setShowForm,
  mail,
  message,
  id
}: {
  comments: CommentType[],
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
  showForm: boolean,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  mail: string,
  message: string,
  id: string
}) => {
  const [updatedMail, setUpdatedMail] = useState(mail);
  const [updatedMessage, setUpdatedMessage] = useState(message);

  const { baseUrl } = config;
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail:updatedMail, message: updatedMessage }),
  };

  const { loading, error, fetchData } = useFetch(`${baseUrl}/api/comments/${id}`, options);
  
  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchData(options);

    function findOneComment(arr: CommentType[], id: string) {
      return arr.find((el) => el.id === id);
    }

    function updateComment(arr: CommentType[], id: string, changes: CommentType) {
      const commentToUpdate = findOneComment(arr, id);
      const updatedComment = {
        ...commentToUpdate,
        ...changes,
      };

      arr.forEach((el, index) => {
        if (el.id === id) {
          arr.splice(index, 1, updatedComment);
        }
      });
    
      return [...arr];
    }

    setComments(updateComment(comments, id, { mail: updatedMail, message: updatedMessage }));

    setShowForm(false);
  };

  return (
    <div className={`${showForm ? 'flex' : 'hidden'} absolute w-full h-full top-0 left-0 justify-center items-center`}>
      <form onSubmit={handleSubmit} className='z-50'>
        <div className="form-field flex align-middle my-3 md:my-4 w-full">
          <input 
            className="rounded-2xl p-4 w-full m-0.5 bg-background"
            type="email"
            name="email"
            placeholder="Email"
            value={updatedMail}
            onChange={(e) => setUpdatedMail(e.target.value)}
          />
        </div>
        <div className="form-field flex align-middle my-3 md:my-4">
          <textarea
            className="rounded-2xl p-4 w-full m-0.5 bg-background h-72 md:h-auto"
            name="message"
            cols={30}
            rows={5}
            placeholder="Add a comment"
            value={updatedMessage}
            onChange={(e) => setUpdatedMessage(e.target.value)}
          />
        </div>
        <div className="button-purple flex mt-4 mx-2 w-[148px]">
          <button className="bg-background rounded-full p-1 w-full m-0.5 justify-start" type="submit">Update</button>
        </div>
      </form>
      <div
        className="bg-slate-800 absolute w-full h-full top-0 left-0 opacity-50 z-10 flex justify-center items-center"
        onClick={() => setShowForm(false)}
      >
      </div>
    </div>
  );
};

export default UpdateCommentForm;
