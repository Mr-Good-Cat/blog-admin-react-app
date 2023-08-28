import Markdown from "./markdown/Markdown";

function UserPageView({ title, description }) {
  return (
    <div className="my-4 border-t border-b py-4">
      <h3 className="text-center font-semibold text-xl mb-2">{title}</h3>
      <div>
        <Markdown text={description} />
      </div>
    </div>
  );
}

export default UserPageView;
