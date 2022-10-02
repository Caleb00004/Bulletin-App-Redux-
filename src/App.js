import PostList from "./features/posts/PostList";
import './app.css';
import {Routes, Route, Router} from 'react-router-dom'
import SinglePostPage from "./features/posts/SinglePostPage";
import AddPost from "./components/AddPostComp";
import Header from "./components/Header";
import Edit from "./components/Edit";

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
{/*        <Route path='/singlePost/:postId' element={<SinglePostPage />}></Route> */}
        <Route path='post'>
          <Route index element={<AddPost />} />
          <Route path=':postId' element={<SinglePostPage />}></Route>
          <Route path="edit/:postId" element={<Edit />}></Route>
        </Route>
      </Routes>
    </main>
  );
}

export default App;
