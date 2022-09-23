import PostList from "./features/posts/PostList";
import AddPost from "./features/posts/AddPostComp";
import './app.css';

function App() {
  return (
    <main>
      <h1>App component</h1>
      <AddPost />
      <PostList />
    </main>
  );
}

export default App;
