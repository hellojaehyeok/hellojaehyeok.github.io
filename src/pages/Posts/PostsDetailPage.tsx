import PostsDetail from 'pages/Posts/Components/PostsDetail';
import fs from 'fs';
import matter from 'gray-matter';
import { removeMdExtension } from 'utils/removeMdExtension';

const PostsDetailPage = ({ frontmatter, content }: { frontmatter: any; content: any }) => {
  const { title, date } = frontmatter;

  return <PostsDetail title={title} date={date} content={content} />;
};

export default PostsDetailPage;

export async function getStaticPaths() {
  const category = fs.readdirSync('./src/contents');
  const params = category.flatMap(_category => {
    const slugs = fs.readdirSync(`./src/contents/${_category}`);
    return slugs.map(slug => ({
      category: _category,
      slug: removeMdExtension(slug),
    }));
  });

  const paths = params.map(params => ({ params }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug, category } }: { params: { slug: string; category: string } }) {
  const fileName = fs.readFileSync(`./src/contents/${category}/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}
