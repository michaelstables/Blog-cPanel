import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import ReactMarkdown from 'react-markdown';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const ContentEditor = ({ value, onChange }) => {
    const [editorValue, setEditorValue] = useState(value);
    const [editorMode, setEditorMode] = useState('wysiwyg'); // 'wysiwyg' or 'markdown'

    const handleEditorChange = content => {
        setEditorValue(content);
        if (onChange) {
            onChange(content);
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => setEditorMode('wysiwyg')}>WYSIWYG</button>
                <button onClick={() => setEditorMode('markdown')}>Markdown</button>
            </div>
            {editorMode === 'wysiwyg' ? (
                <ReactQuill
                    value={editorValue}
                    onChange={handleEditorChange}
                    // Define your Quill modules and formats here if needed
                />
            ) : (
                <div>
                    <textarea
                        style={{ width: '100%', height: '300px' }}
                        value={editorValue}
                        onChange={e => handleEditorChange(e.target.value)}
                    />
                    <ReactMarkdown>{editorValue}</ReactMarkdown>
                </div>
            )}
        </div>
    );
};

export default ContentEditor;
