import React, { useEffect, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import MenuBar from './components/MenuBar';
import EditorContainer from './components/EditorContainer';
import OutputViewer from './components/OutputViewer';
import { FileEdit, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
    const [outputMode, setOutputMode] = useState<'html' | 'json'>('html');
    const [darkMode, setDarkMode] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full h-auto rounded-lg shadow-md my-4 cursor-pointer hover:shadow-lg transition-shadow duration-200',
                },
                inline: false,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 dark:text-blue-400 hover:underline cursor-pointer',
                },
            }),
            HorizontalRule.configure({
                HTMLAttributes: {
                    class: 'my-6 border-t-2 border-gray-300 dark:border-gray-600',
                },
            }),
        ],
        content: `
      <h1>Welcome to the Rich Text Editor</h1>
      <p>This is a <strong>powerful</strong> and <em>beautiful</em> rich text editor built with <u>TipTap</u> and styled with Tailwind CSS.</p>
      <h2>Features:</h2>
      <ul>
        <li>Rich text formatting (bold, italic, underline)</li>
        <li>Multiple heading levels</li>
        <li>Ordered and unordered lists</li>
        <li>Code blocks and quotes</li>
        <li><strong>Drag & drop image insertion</strong></li>
        <li><strong>Paste images from clipboard</strong></li>
        <li>Link management</li>
        <li>Undo/Redo functionality</li>
        <li><strong>Dark mode support</strong></li>
      </ul>
      <blockquote>
        Start typing, drag & drop images, or paste content to experience the smooth editing experience!
      </blockquote>
    `,
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[350px]',
            },
        },
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${
                darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
            }`}>
            <div className='max-w-6xl mx-auto p-6'>
                {/* Header */}
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-3'>
                        <div className='p-2 bg-blue-100 dark:bg-blue-900 rounded-lg'>
                            <FileEdit
                                className='text-blue-600 dark:text-blue-400'
                                size={24}
                            />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-800 dark:text-white'>
                                Rich Text Editor
                            </h1>
                            <p className='text-gray-600 dark:text-gray-400'>
                                Create beautiful content with drag & drop
                                support
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className='p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm'
                        title={
                            darkMode
                                ? 'Switch to light mode'
                                : 'Switch to dark mode'
                        }>
                        {darkMode ? (
                            <Sun className='text-yellow-500' size={20} />
                        ) : (
                            <Moon className='text-gray-600' size={20} />
                        )}
                    </button>
                </div>

                {/* Editor */}
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700'>
                    <MenuBar editor={editor} />
                    <EditorContainer editor={editor} />
                </div>

                {/* Output Viewer */}
                <OutputViewer
                    editor={editor}
                    outputMode={outputMode}
                    setOutputMode={setOutputMode}
                />
            </div>
        </div>
    );
};

export default App;
