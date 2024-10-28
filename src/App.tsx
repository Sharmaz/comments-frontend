import useFetch from './hooks/useFetch';
import config from '../config/index';
import Comment from './components/Comment';

type CommentProps = {
  id: string
  mail: string;
  message: string;
  createdAt: string;
};

function App() {
  const { baseUrl } = config;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const { comments, loading, error } = useFetch(`${baseUrl}/api/comments`, options);

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Leave Comments</h1>
      { comments.length > 0 &&
        comments.map((comment: CommentProps) => <Comment key={comment.id} comment={comment} />)
      }
    </div>
  )
}

export default App
