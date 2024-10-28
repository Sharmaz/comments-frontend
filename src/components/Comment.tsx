import { CommentType } from "../types/comment";

const Comment = ({ comment }: { comment: CommentType }) => {

  const { mail, message } = comment;
  return (
    <div className="max-w-[320px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[960px] p-4 rounded-lg">
      <div className="text-slate-200">
        <h2 className="font-bold">{mail}</h2>
        <p className="text-sm">{message}</p>
      </div>
      <div className="flex">
        <div className="button-purple flex align-middle mt-4 mx-2 md:mt-8 w-[148px]">
          <button className="bg-background rounded-full p-1 w-full m-0.5" type="button">Edit</button>
        </div>
        <div className="button-orange flex align-middle mt-4 mx-2 md:mt-8 w-[148px]">
          <button className="bg-background rounded-full p-1 w-full m-0.5" type="button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
