import { FC } from 'react';

interface IProps {
    onClick: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
    title: string;
    isActive?: boolean;
    disabled?: boolean;
}
const ToolbarButton: FC<IProps> = ({
    onClick,
    isActive = false,
    children,
    title,
    disabled = false,
}) => {
    return (
        <button
            onClick={onClick}
            title={title}
            disabled={disabled}
            className={`
p-2 rounded-lg transition-all duration-200 ease-in-out
hover:bg-gray-100 dark:hover:bg-gray-700
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
disabled:opacity-50 disabled:cursor-not-allowed
${
    isActive
        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
        : 'text-gray-600 dark:text-gray-300'
}
`}>
            {children}
        </button>
    );
};

export default ToolbarButton;
