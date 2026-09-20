import type { PostType } from '../types/post';


interface Postprops{
    posts:PostType[]
}


export const PostListComponent= ({posts}:Postprops)=>{
    return(
        <div id="post-list">
            {posts.map((post)=>(
                <article key={post.title} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.desc}</p>
                    <small>By {post.author} On {post.date.toLocaleDateString()}</small>
                </article>
            ))}
        </div>
    )
}