import styled from '@emotion/styled';
import md from 'markdown-it';

const Contents = ({ content }: { content: any }) => {
  return <Layout dangerouslySetInnerHTML={{ __html: md().render(content) }} />;
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
