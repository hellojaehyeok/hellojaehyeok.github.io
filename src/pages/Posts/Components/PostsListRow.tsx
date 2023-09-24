import styled from '@emotion/styled';
import { Post } from '../PostsListPage';

const PostsListRow = ({ post, onClick }: { post: Post; onClick: (p: Post) => {} }) => {
  return (
    <ListRow onClick={() => onClick(post)}>
      <Title>{post.title}</Title>
      <Line />
      <PostingDate>{post.date}</PostingDate>
    </ListRow>
  );
};

export default PostsListRow;

const ListRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 15px;
`;
const Line = styled.div`
  height: 1px;
  flex: 1;
  margin: 0 20px;
  background-color: #d8d8d8;
`;

const PostingDate = styled.div`
  font-weight: 100;
  font-size: 14px;
  color: #999;
`;
