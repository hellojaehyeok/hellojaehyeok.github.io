import { readdir } from 'fs/promises';
import { readFileSync } from 'fs';
import Router from 'next/router';
import { removeMdExtension } from 'utils/removeMdExtension';
import matter from 'gray-matter';
import PostsListWrap from './Components/PostsListWrap';
import PostsListRow from './Components/PostsListRow';

export interface Post {
  date: string;
  title: string;
  path: string;
  category: string;
}

const PostsListPage = ({ posts }: { posts: Post[] }) => {
  const ascendingPosts = sortPostsByDateAscending(posts);

  return (
    <PostsListWrap>
      {ascendingPosts.map(post => (
        <PostsListRow key={post.path} onClick={({ path }) => Router.push(post.path)} post={post} />
      ))}
    </PostsListWrap>
  );
};

export default PostsListPage;

export async function getStaticProps() {
  const categories = await readdir('./src/contents');
  const categorizedPosts = await Promise.all(
    categories.map(async category => {
      const slugs = await readdir(`./src/contents/${category}`);
      return await Promise.all(
        slugs.map(async slug => {
          const fileName = await readFileSync(`./src/contents/${category}/${slug}`, 'utf-8');
          const { title, date } = matter(fileName).data;
          return {
            date,
            title,
            path: `/posts/${category}/${removeMdExtension(slug)}`,
            category,
          };
        })
      );
    })
  );
  const posts = categorizedPosts.flat();
  return { props: { posts } };
}

function sortPostsByDateAscending(posts: Post[]) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}
