import PostList from "./features/posts/PostList";
import './app.css';
import {Routes, Route, Router} from 'react-router-dom'
import SinglePostPage from "./features/posts/SinglePostPage";
import AddPost from "./components/AddPostComp";
import Header from "./components/Header";
function App() {
  return (
    <main>
      <Header />

      <Routes>
        <Route path="/*" element={
          <>
            <PostList/>
          </>
        } />
        <Route path='/singlePost/:postId' element={<SinglePostPage />}></Route>
        <Route path='/post' element={<AddPost />}></Route>
      </Routes>
    </main>
  );
}

export default App;
