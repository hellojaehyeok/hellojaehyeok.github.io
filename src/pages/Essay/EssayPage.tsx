import Contents from 'components/Contents';
import fs from 'fs';
import matter from 'gray-matter';

const EssayPage = ({ frontmatter, content }: { frontmatter: any; content: any }) => {
  const { title, date } = frontmatter;

  return <Contents title={title} date={date} content={content} />;
};

export default EssayPage;

export async function getStaticPaths() {
  const files = fs.readdirSync('./src/contents/essay');

  const paths = files.map(fileName => {
    return {
      params: {
        slug: fileName.replace('.md', ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string[] } }) {
  const fileName = fs.readFileSync(`./src/contents/essay/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}
