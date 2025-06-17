import React from 'react';
import { Editor } from '@tiptap/react';
import {
    Bold,
    Italic,
    Underline,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Code,
    Quote,
    Minus,
    Image,
    Undo,
    Redo,
    Link,
    Unlink,
} from 'lucide-react';
import ToolbarButton from './ToolbarButton';

interface MenuBarProps {
    editor: Editor | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
    if (!editor) return null;

    const addImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true; // Allow multiple image selection
        input.onchange = async () => {
            if (input.files?.length) {
                Array.from(input.files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        editor
                            .chain()
                            .focus()
                            .setImage({ src: reader.result as string })
                            .run();
                    };
                    reader.readAsDataURL(file);
                });
            }
        };
        input.click();
    };

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const removeLink = () => {
        editor.chain().focus().unsetLink().run();
    };

    //const ToolbarButton: React.FC<{
    //    onClick: () => void;
    //    isActive?: boolean;
    //    children: React.ReactNode;
    //    title: string;
    //    disabled?: boolean;
    //}> = ({ onClick, isActive = false, children, title, disabled = false }) => (
    //    <button
    //        onClick={onClick}
    //        title={title}
    //        disabled={disabled}
    //        className={`
    //    p-2 rounded-lg transition-all duration-200 ease-in-out
    //    hover:bg-gray-100 dark:hover:bg-gray-700
    //    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    //    disabled:opacity-50 disabled:cursor-not-allowed
    //    ${
    //        isActive
    //            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
    //            : 'text-gray-600 dark:text-gray-300'
    //    }
    //  `}>
    //        {children}
    //    </button>
    //);

    const Divider = () => (
        <div className='w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1' />
    );

    return (
        <div className='flex flex-wrap items-center gap-1 p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-t-lg'>
            {/* Text Formatting */}
            <div className='flex items-center gap-1'>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title='Bold (Ctrl+B)'>
                    <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title='Italic (Ctrl+I)'>
                    <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    isActive={editor.isActive('underline')}
                    title='Underline (Ctrl+U)'>
                    <Underline size={16} />
                </ToolbarButton>
            </div>

            <Divider />

            {/* Headings */}
            <div className='flex items-center gap-1'>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    isActive={editor.isActive('heading', { level: 1 })}
                    title='Heading 1'>
                    <Heading1 size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    isActive={editor.isActive('heading', { level: 2 })}
                    title='Heading 2'>
                    <Heading2 size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    isActive={editor.isActive('heading', { level: 3 })}
                    title='Heading 3'>
                    <Heading3 size={16} />
                </ToolbarButton>
            </div>

            <Divider />

            {/* Lists */}
            <div className='flex items-center gap-1'>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive('bulletList')}
                    title='Bullet List'>
                    <List size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive('orderedList')}
                    title='Numbered List'>
                    <ListOrdered size={16} />
                </ToolbarButton>
            </div>

            <Divider />

            {/* Special Elements */}
            <div className='flex items-center gap-1'>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                    isActive={editor.isActive('codeBlock')}
                    title='Code Block'>
                    <Code size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    isActive={editor.isActive('blockquote')}
                    title='Quote'>
                    <Quote size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                    title='Horizontal Rule'>
                    <Minus size={16} />
                </ToolbarButton>
            </div>

            <Divider />

            {/* Media & Links */}
            <div className='flex items-center gap-1'>
                <ToolbarButton
                    onClick={addImage}
                    title='Insert Image (or drag & drop)'>
                    <Image size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={addLink}
                    isActive={editor.isActive('link')}
                    title='Add Link'>
                    <Link size={16} />
                </ToolbarButton>
                {editor.isActive('link') && (
                    <ToolbarButton onClick={removeLink} title='Remove Link'>
                        <Unlink size={16} />
                    </ToolbarButton>
                )}
            </div>

            <Divider />

            {/* Undo/Redo */}
            <div className='flex items-center gap-1'>
                <ToolbarButton
                    onClick={() => editor.chain().focus().undo().run()}
                    title='Undo (Ctrl+Z)'
                    disabled={!editor.can().undo()}>
                    <Undo size={16} />
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().redo().run()}
                    title='Redo (Ctrl+Y)'
                    disabled={!editor.can().redo()}>
                    <Redo size={16} />
                </ToolbarButton>
            </div>
        </div>
    );
};

export default MenuBar;
