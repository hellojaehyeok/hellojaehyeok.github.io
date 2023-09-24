import { readdir } from 'fs/promises';
import { readFileSync } from 'fs';
import Router from 'next/router';
import { removeMdExtension } from 'utils/removeMdExtension';
import matter from 'gray-matter';

interface Posts {
  date: string;
  title: string;
  path: string;
  category: string;
}

const PostsPage = ({ posts }: { posts: Posts[] }) => {
  return (
    <>
      {posts.map(post => (
        <div key={post.path} onClick={() => Router.push(post.path)}>
          {post.title}
        </div>
      ))}
    </>
  );
};

export default PostsPage;

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
