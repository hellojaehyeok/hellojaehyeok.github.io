import Layout from '../components/Post/Layout';
import Title from '../components/post/Title';
import Contents from '../components/post/Contents';
import React from 'react';
import { graphql } from 'gatsby';

export default function Page({ data, pageContext }) {
  const {
    html,
    frontmatter: { title },
  } = data.markdownRemark;

  return (
    <Layout>
      <Title>{title}</Title>
      <Contents html={html} />
    </Layout>
  );
}

export const query = graphql`
  query BlogPostBySlug($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 280)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
