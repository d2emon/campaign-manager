import { Title } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownTextProps {
  children?: string;
};

const MarkdownText = ({ children }: MarkdownTextProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ node, ...props }) => <Title order={1} {...props} />,
        h2: ({ node, ...props }) => <Title order={2} {...props} />,
        h3: ({ node, ...props }) => <Title order={3} {...props} />,
        h4: ({ node, ...props }) => <Title order={4} {...props} />,
        h5: ({ node, ...props }) => <Title order={5} {...props} />,
        h6: ({ node, ...props }) => <Title order={6} {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1" {...props} />,
        ol: ({ node, ...props }) => <ul className="list-decimal pl-5 space-y-1" {...props} />,
      }}
    >
      {children || ''}
    </ReactMarkdown>
  );
};

export default MarkdownText;
