import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import styled from 'styled-components';
import StyledLink from '../components/styled-link';
import About from '../components/about';
import FAQComponent from '../components/faq';
import { Helmet } from 'react-helmet';

const HomePage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;
  const intro = data.markdownRemark.html;
  const title = data.markdownRemark.frontmatter.title;

  return (
    <Layout title={title}>
      <Helmet>
        <script src="https://cdn.customgpt.ai/js/embed.js" div_id="customgpt_chat" p_id="10133" p_key="8814ee48b1bbae9f19a2fe653c4befa0" width="100%" reset_conversation="1" height="700px"></script>
      </Helmet>
      <Intro
        dangerouslySetInnerHTML={{
          __html: intro,
        }}
      />

      <div id="customgpt_chat"></div>
      <About />

      <FAQComponent />
      <h2 style={{ textAlign: "center", marginTop: "5vh" }}>
        Posts
      </h2>
      <PostList posts={posts} />

      <StyledLink
        css={`
          display: block;
          margin-top: var(--size-800);
          margin-bottom: var(--size-800);
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
        `}
        to="/blog"
      >
        View All posts
      </StyledLink>
    </Layout>
  );
};

export default HomePage;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--size-800);
  margin-bottom: var(--size-900);
  text-align: center;

  & p {
    text-transform: capitalize;
    font-size: var(--size-400);
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 9
    ) {
      nodes {
        fields {
          slug
        }
        excerpt
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          title
          tags
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
