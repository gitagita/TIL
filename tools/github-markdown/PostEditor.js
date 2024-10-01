import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import 'react-markdown-editor-lite/lib/index.css';
import './PostEditor.css';

const PostEditor = ({ title, content, handleTitleChange, handleContentChange }) => {

  const components = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={materialDark} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

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
          renderHTML={(text) => (
            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
              {text}
            </ReactMarkdown>
          )}
          onChange={handleContentChange}
        />
      </form>
    </div>
  );
};

export default PostEditor;