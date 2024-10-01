import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './PostEditor.css';

const PostEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = ({ text }) => setContent(text);


  return (
    <div className="container">
      <h1>게시글 작성</h1>
      <form id="postForm">
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <label htmlFor="content">내용:</label>
        <MdEditor
          value={content}
          style={{ height: '500px' }}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleContentChange}
        />
      </form>
    </div>
  );
};

export default PostEditor;