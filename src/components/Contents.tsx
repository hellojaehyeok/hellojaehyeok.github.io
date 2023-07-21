import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { duotoneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ReactMarkdown from 'react-markdown';
import styled from '@emotion/styled';

const Contents = ({ title, date, content }: { title: string; date: string; content: string }) => {
  return (
    <Layout>
      <Title>{title}</Title>
      <CreateDate>{date}</CreateDate>
      <Body>
        <ReactMarkdown
          components={{
            code: CodeBlock,
          }}
        >
          {content}
        </ReactMarkdown>
      </Body>
    </Layout>
  );
};

export default Contents;

const Layout = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 120px 0;
`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 10px;
`;
const CreateDate = styled.div`
  margin-bottom: 40px;
  font-weight: 300;
  font-size: 14px;
  color: #8a8a8a;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 28px;
  gap: 20px;
  h2 {
    font-weight: 400;
    font-size: 16px;
  }
  h3 {
    font-weight: 400;
    font-size: 16px;
  }
  strong {
    font-weight: 400;
  }
  li {
    list-style: circle;
    margin: 5px 0 5px 30px;
    ul {
      margin: 5px 0 0 0;
    }
  }
  hr {
    margin: 50px 0;
    background-color: rgb(209, 209, 209);
    height: 1px;
    border: 0;
  }
  pre > pre {
    border-radius: 13px;
    border: 1px solid #e4e2e0;
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
