import styled from '@emotion/styled';
import { ReactNode } from 'react';

const PostsListWrap = ({ children }: { children: ReactNode }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PostsListWrap;

const Wrapper = styled.div`
  margin: 0 auto;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  gap: 20px;
`;
