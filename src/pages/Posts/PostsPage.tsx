import Contents from 'components/PostContents';
import fs from 'fs';
import matter from 'gray-matter';

const Posts = ({ frontmatter, content }: { frontmatter: any; content: any }) => {
  const { title, date } = frontmatter;

  return <Contents title={title} date={date} content={content} />;
};

export default Posts;

export async function getStaticPaths() {
  const category = fs.readdirSync('./src/contents');
  const params = category.flatMap(_category => {
    const slugs = fs.readdirSync(`./src/contents/${_category}`);
    return slugs.map(slug => ({
      category: _category,
      slug: slug.replace('.md', ''),
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
