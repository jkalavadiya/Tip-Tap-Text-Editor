import React, { useState } from 'react';
import { EditorContent, Editor } from '@tiptap/react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface EditorContainerProps {
  editor: Editor | null;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ editor }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (editor && reader.result) {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result as string })
            .run();
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = Array.from(e.clipboardData.items);
    const imageItems = items.filter(item => item.type.startsWith('image/'));

    imageItems.forEach(item => {
      const file = item.getAsFile();
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (editor && reader.result) {
            editor
              .chain()
              .focus()
              .setImage({ src: reader.result as string })
              .run();
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div 
      className={`
        relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
        rounded-b-lg min-h-[400px] transition-all duration-200
        ${isDragOver ? 'border-blue-500 dark:border-blue-400 border-2 bg-blue-50 dark:bg-blue-900/20' : ''}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isDragOver && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30 rounded-b-lg border-2 border-dashed border-blue-500 dark:border-blue-400">
          <div className="text-center">
            <Upload className="mx-auto mb-2 text-blue-500 dark:text-blue-400" size={32} />
            <p className="text-blue-600 dark:text-blue-300 font-medium">Drop images here to insert</p>
          </div>
        </div>
      )}
      
      <EditorContent 
        editor={editor} 
        className="prose prose-lg dark:prose-invert max-w-none p-6 focus:outline-none"
        onPaste={handlePaste}
      />
      
      {/* Empty state hint */}
      {editor && editor.isEmpty && (
        <div className="absolute top-6 left-6 pointer-events-none text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-2 text-sm">
            <ImageIcon size={16} />
            <span>Start typing or drag & drop images here...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorContainer;