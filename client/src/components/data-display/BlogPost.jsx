import React from 'react';

const BlogPost = ({ title, content, author, ...props }) => {
    return (
        <article>
            <h1>{title}</h1>
            <p>{content}</p>
            {/* Display other post details like author, etc. */}
        </article>
    );
};

export default BlogPost;
