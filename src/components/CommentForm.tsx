import { useState } from 'react';
import { v4 } from 'uuid';
import useFetch from '../hooks/useFetch';
import config from '../../config/index';
import { CommentType } from '../types/comment';

const CommentForm = ({ comments, setComments }: { comments: CommentType[], setComments: React.Dispatch<React.SetStateAction<CommentType[]>> }) => {
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');

  const { baseUrl } = config;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mail, message }),
  };

  const { loading, error, fetchData } = useFetch(`${baseUrl}/api/comments`, options);
  
  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchData(options);
    setComments([...comments, { id: v4(), mail, message, createdAt: new Date().toISOString() }]);
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit}>
        <div className="form-field flex align-middle my-3 md:my-4 w-full">
          <input 
            className="rounded-2xl p-4 w-full m-0.5 bg-background"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="form-field flex align-middle my-3 md:my-4">
          <textarea
            className="rounded-2xl p-4 w-full m-0.5 bg-background h-72 md:h-auto"
            name="message"
            cols={30}
            rows={5}
            placeholder="Add a comment"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="button-purple flex mt-4 mx-2 w-[148px]">
          <button className="bg-background rounded-full p-1 w-full m-0.5 justify-start" type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
