import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';

const Contents = ({ content }: { content: string }) => {
  return (
    <Layout>
      <ReactMarkdown
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </Layout>
  );
};

export default Contents;

const Layout = styled.div`
  width: 700px;
  h3 {
    margin-bottom: 20px;
    font-size: 20px;
  }
  p,
  ul {
    font-weight: 100;
    margin-bottom: 15px;
  }
  li {
    list-style: disc;
    margin: 0 0 10px 40px;
    ul {
      margin: 10px 0 0 0;
    }
  }
  hr {
    margin: 50px 0;
    background-color: rgb(209, 209, 209);
    height: 1px;
    border: 0;
  }
`;

// NOTE: children의 string[]이지만, ReactMarkdown 타입 에러로 인하여 any를 사용
const CodeBlock = ({ children, className }: { children: any[]; className?: string }) => {
  return (
    <SyntaxHighlighter language={className?.replace('language-', '')} style={duotoneLight}>
      {children}
    </SyntaxHighlighter>
  );
};
