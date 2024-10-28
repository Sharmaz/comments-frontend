import useFetch from './hooks/useFetch';
import config from '../config/index';
import CommentList from './components/CommentList';

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
      <h1 className="m-4">Leave Comments</h1>
      <CommentList comments={comments} />
    </div>
  )
}

export default App
