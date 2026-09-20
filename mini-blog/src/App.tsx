import {HeaderComponent} from './components/HeaderComponent';
import {PostListComponent} from './components/PostListComponent';
import './App.css'
import { posts } from './data/posts';


export const App=()=>{
  return(
    <>
    <HeaderComponent/>
    <PostListComponent posts={posts}/>
    </>
  )
}