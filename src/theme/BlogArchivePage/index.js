import React from 'react';
import Layout from "@theme/Layout";
import BlogArchivePage from '@theme-original/BlogArchivePage';
import BlogRelationGraph from '@site/src/components/blogPostRelationGraph';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { PageMetadata } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';

function Year({ year, posts }) {
  return (
    <>
      <Heading as="h3" id={year}>
        {year}
      </Heading>
      <ul>
        {posts.map((post) => (
          <li key={post.metadata.date}>
            <Link to={post.metadata.permalink}>
              {post.metadata.formattedDate} - {post.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
function YearsSection({ years }) {
  return (
    <section className="margin-vert--lg">
      <div className="container">
        <div className="row">
          {years.map((_props, idx) => (
            <div key={idx} className="col col--4 margin-vert--lg">
              <Year {..._props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function listPostsByYears(blogPosts) {
  const postsByYear = blogPosts.reduce((posts, post) => {
    const year = post.metadata.date.split('-')[0];
    const yearPosts = posts.get(year) ?? [];
    return posts.set(year, [post, ...yearPosts]);
  }, new Map());
  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts,
  }));
}

export function getGraphOf(props) {
  // some hyper params
  const _base_node_size = 5

  const blogPosts = props.archive.blogPosts
  // set of tags
  const _tags = new Map(blogPosts.flatMap(x => x.metadata.tags.map(x => [x.label, x])));
  const _tagNames = [..._tags.keys()]
  // initialize tag->posts mapping
  var _tag2posts = {}
  _tagNames.forEach(x => _tag2posts[x] = [])
  var _nodes = [] // store nodes
  var _links = [] // store links
  blogPosts.forEach(x => {
    // add posts into tag->posts mapping
    x.metadata.tags.forEach(t => {
      _tag2posts[t.label].push(x)
      _links.push({
        "source": t.label,
        "target": x.metadata.title
      })
    })
    // add post into nodes
    _nodes.push({
      "id": x.metadata.title,
      "name": x.metadata.title,
      "symbolSize": _base_node_size, // default symbol size for node of post
      "permalink": x.metadata.permalink // jump to this link on click
      // "category": 0, // default category for node of post
    })
  })
  // add catagories
  var _categories = [] // catagory id 0 is for posts
  // add tags into nodes
  var _catagory_indexer = 0
  _tagNames.forEach(x => {
    _nodes.push({
      "id": x,
      "name": x,
      "symbolSize": _tag2posts[x].length + _base_node_size, // node size based on num of posts with the tag
      "category": _catagory_indexer++, // use different catagory for node of tag
      "permalink": _tags.get(x).permalink
    })
    _categories.push({ "name": x }) // add catagory for tag
  })

  const graph = {
    "nodes": _nodes,
    "links": _links,
    "categories": _categories
  }

  return graph
}

export default function BlogArchivePageWrapper(props) {
  console.log(props.archive)
  const graph = getGraphOf(props)
  const years = listPostsByYears(props.archive.blogPosts);
  return (
    <Layout title="Posts relations">
      <main>{years.length > 0 && <YearsSection years={years} />}</main>
      <div>
        <BlogRelationGraph graph={graph} />
      </div>
    </Layout>
  );
}