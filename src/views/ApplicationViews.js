import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { SubscribedPosts } from "../components/posts/SubscribedPosts"
import { TagList } from "../components/tag/TagList"
import { Authorized } from "./Authorized"
import { ViewCurrentUserPost } from "../components/posts/CurrentUserPosts"
import { PostForm } from "../components/posts/PostForm"
import { PostDetails } from "../components/posts/postDetails"
import { CategoryList } from "../components/category/CategoryList"
import { UpdatePostForm } from "../components/posts/PostEdit"
import { CategoryEdit } from "../components/category/CategoryEdit"
import { TagEdit } from "../components/tag/TagEdit"
import { PostComments } from "../components/posts/postComments"
import { UserList } from "../components/users/UserList"
import { UserDetails } from "../components/users/UserDetails"
import { MakeComment } from "../components/posts/makeComment"
import { EditComment } from "../components/posts/editComment"
import { AllPosts } from "../components/posts/allposts"
import { ReactionList } from "../components/reactions/ReactionList"
import { ReactionEdit } from "../components/reactions/ReactionEdit"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/tags" element={<TagList />} />
      <Route path="/reactions" element={<ReactionList />} />
      <Route path="/categories/:categoryId/edit" element={<CategoryEdit />} />
      <Route path="/tags/:TagId/edit" element={<TagEdit />} />
      <Route path="/reactions/:reactionId/edit" element={<ReactionEdit />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/postform" element={<PostForm token={token} />} />
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />} />
      <Route path="/" element={< SubscribedPosts token={token}/>}/>
      <Route path="/allposts" element={<AllPosts token={token} />} />
      <Route path="/myposts" element={<ViewCurrentUserPost token={token} />} />
      <Route path="/posts/:postId" element={<PostDetails token={token} />} />
      <Route path="/posts/:postId/comments" element={<PostComments token={token}/>} />
      <Route path="/posts/:postId/newComment" element={<MakeComment token={token}/>} />
      <Route path="/comment/:commentId/editcomment" element={<EditComment token={token}/>} />
      <Route path="/posts/:postId/edit" element={<UpdatePostForm token={token} />} />
      <Route path="/users" element={<UserList token={token} />} />
      <Route path="/users/:userId/details" element={<UserDetails token={token} />} />

    </Routes>
  </>
}