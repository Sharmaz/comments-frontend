import config from '../config/index';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import useFetch from './hooks/useFetch';

function App() {
  const { baseUrl } = config;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  };

  const { data, setData, loading, error } = useFetch(`${baseUrl}/api/comments`, options, { immediate: true });

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="form-container w-full max-w-[320px] sm:max-w-[480px] md:max-w-[640px] p-px rounded-xl">
        <div className="text-slate-200 bg-background rounded-xl p-4">
          <h1 className="m-4">Leave Comments</h1>
          <CommentForm comments={data} setComments={setData} />
          <CommentList comments={data} setComments={setData} />
        </div>
      </div>
    </div>
  )
}

export default App
