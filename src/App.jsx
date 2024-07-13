// import Header from "./components/Header";
// import Nav from "./components/Nav";
// import Footer from "./components/Footer";
// import Home from "./components/Home";
// import NewPost from "./components/NewPost";
// import PostPage from "./components/PostPage";
// import About from "./components/About";
// import Missing from "./components/Missing";
// import { Routes, Route, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { format } from "date-fns";

// import {api} from "./api";

// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, addPosts } from "./store/counterSlice";

// function App() {
//   const posts = useSelector((state) => state.posts.posts);
//   const dispatch = useDispatch();

//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [postTitle, setPostTitle] = useState("");
//   const [postBody, setPostBody] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchPost() {
//       try {
//         const response = await api.get("/posts");
//         dispatch(addPosts(response.data));
//       } catch (error) {}
//     }

//   }, []);

//   useEffect(() => {
//     const filteredResults = posts.filter(
//       (post) =>
//         post.body.toLowerCase().includes(search.toLowerCase()) ||
//         post.title.toLowerCase().includes(search.toLowerCase())
//     );

//     setSearchResults(filteredResults.reverse());
//   }, [posts, search]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
//     const datetime = format(new Date(), "MMMM dd, yyyy pp");
//     const newPost = { id, title: postTitle, datetime, body: postBody };

//     dispatch(addPost(newPost));
//     setPostTitle("");
//     setPostBody("");
//     navigate("/");
//   };

//   const handleDelete = (id) => {
//     dispatch(deletePost({ id }));
//     navigate("/");
//   };

//   return (
//     <div className="App">
//       <Header title="React JS Blog" />
//       <Nav search={search} setSearch={setSearch} />
//       <Routes>
//         <Route path="/" element={<Home posts={searchResults} />} />
//         <Route
//           path="/post"
//           element={
//             <NewPost
//               handleSubmit={handleSubmit}
//               postTitle={postTitle}
//               setPostTitle={setPostTitle}
//               postBody={postBody}
//               setPostBody={setPostBody}
//             />
//           }
//         />
//         <Route
//           path="/post/:id"
//           element={<PostPage posts={posts} handleDelete={handleDelete} />}
//         />
//         <Route path="/about" element={<About />} />
//         <Route path="*" element={<Missing />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// export default App;

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";
import Missing from "./components/Missing";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { api } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, addPosts, addPost } from "./store/counterSlice";

function App() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await api.get("/posts");
        dispatch(addPosts(response.data));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }

    fetchPosts();
  }, [dispatch]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };

    dispatch(addPost(newPost));
    setPostTitle("");
    setPostBody("");
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      dispatch(deletePost({ id }));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
