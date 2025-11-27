import Blog from "./Blog.jsx";

const BlogForm = ({blogs}) => {
    return (
        <div>
            <h2>blogs</h2>
            {blogs.slice().sort((a,b)=>b.likes-a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default BlogForm