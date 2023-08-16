import fs from 'fs/promises';
import Router from 'next/router';
import { removeMdExtension } from 'utils/removeMdExtension';

interface Posts {
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
  const categories = await fs.readdir('./src/contents');
  const posts: Posts[] = [];

  await Promise.all(
    categories.map(async category => {
      const postFiles = await fs.readdir(`./src/contents/${category}`);
      posts.push(
        ...postFiles.map(title => ({
          title: removeMdExtension(title),
          path: `/posts/${category}/${removeMdExtension(title)}`,
          category,
        }))
      );
    })
  );

  return { props: { posts } };
}
