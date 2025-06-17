import React from 'react';
import { Editor } from '@tiptap/react';
import { Code, FileText, ClipboardCopy } from 'lucide-react';

interface OutputViewerProps {
    editor: Editor | null;
    outputMode: 'html' | 'json';
    setOutputMode: (mode: 'html' | 'json') => void;
}

const OutputViewer: React.FC<OutputViewerProps> = ({
    editor,
    outputMode,
    setOutputMode,
}) => {
    const [copied, setCopied] = React.useState(false);

    const getOutput = () => {
        if (!editor) return '';

        if (outputMode === 'html') {
            return editor.getHTML();
        } else {
            return JSON.stringify(editor.getJSON(), null, 2);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getOutput());
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch {
            // Optionally handle error
        }
    };

    return (
        <div className='mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden'>
            <div className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600'>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    Output Preview
                </h3>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => setOutputMode('html')}
                        className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
              ${
                  outputMode === 'html'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }
            `}>
                        <FileText size={16} />
                        HTML
                    </button>
                    <button
                        onClick={() => setOutputMode('json')}
                        className={`
              flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
              ${
                  outputMode === 'json'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }
            `}>
                        <Code size={16} />
                        JSON
                    </button>
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                          ${
                              copied
                                  ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                          }
                        `}
                        title='Copy output'>
                        <ClipboardCopy size={16} />
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
            <div className='p-4'>
                <pre className='bg-gray-100 dark:bg-gray-900 text-sm p-4 rounded-lg overflow-x-auto text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'>
                    <code>{getOutput()}</code>
                </pre>
            </div>
        </div>
    );
};

export default OutputViewer;
