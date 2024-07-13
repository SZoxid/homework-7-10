import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { editPost } from "../store/counterSlice";

const PostPage = ({ posts, handleDelete }) => {
  const [edit, setEdit] = useState(false);
  const [title, setPostTitle] = useState("");
  const [body, setBody] = useState("");

  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setPostTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSave = () => {
    dispatch(editPost({ id: post.id, title, body }));
    setEdit(false);
    navigate("/");
  };

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <div>
            {edit ? (
              <form onSubmit={handleSave}>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <textarea
                  rows="5"
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
              </form>
            ) : (
              <>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="body">{post.body}</p>
              </>
            )}
            <div className="buttons">
              <button className="danger" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
              <button onClick={() => (edit ? handleSave() : setEdit(true))}>
                {edit ? "Save" : "Edit"}
              </button>
              <button onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </div>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
