import React, { useEffect, useMemo, useState } from 'react';
import Layout from "@theme/Layout";
import BlogRelationGraph from '@site/src/components/blogPostRelationGraph';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useColorMode } from "@docusaurus/theme-common";
import BrowserOnly from '@docusaurus/BrowserOnly';

function Year({ year, posts }) {
  return (
    <>
      <Heading as="h3" id={year}>
        {year}
      </Heading>
      <ul>
        {posts.map((post) => (
          <li key={post.metadata.date + '_' + post.metadata.title}>
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

export function getTagGraphOf(props) {
  // some hyper params
  const _base_node_size = 10
  const _symbol_scale_factor = 1.5

  const blogPosts = props.archive.blogPosts
  // set of tags
  const _tags = new Map(blogPosts.flatMap(x => x.metadata.tags.map(x => [x.label, x])));
  const _tagNames = [..._tags.keys()].sort() // sort by name
  // initialize tag->posts mapping
  var _tag2posts = {}
  _tagNames.forEach(x => _tag2posts[x] = [])
  var _nodes = [] // store nodes
  var _links = [] // store links
  blogPosts.forEach(x => {
    // add posts into tag->posts mapping
    x.metadata.tags.forEach(t => {
      _tag2posts[t.label].push(x)
      // add edge between tag and post
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
      "permalink": x.metadata.permalink, // jump to this link on click
      // "category": 0, // posts do not have category
      "itemStyle": {
        "color": "#b3b3b3"
      }
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
      "symbolSize": _tag2posts[x].length * _symbol_scale_factor + _base_node_size, // node size based on num of posts with the tag
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

/**
 * 
 * @param {Map} dict 
 */
function dictItemsSortedByKey(dict) {
  return [...dict].sort((a, b) => {
    return a[0] > b[0] ? 1 : -1
  })
}

export function ListOfTags({ posts }) {
  const tag2link_items = useMemo(() => {
    var tag2link = new Map(posts.flatMap(x => x.metadata.tags.map(x => [x.label, x.permalink])));
    return dictItemsSortedByKey(tag2link)
  });
  const brightness = useColorMode().colorMode == 'dark' ? 70 : 40
  const [base_color, set_base_color] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      set_base_color((base_color - 3) % 360)
    }, 100);
    return () => clearTimeout(timer)
  }, [base_color]);

  return (
    <div style={{ willChange: 'transform' }}>
      {
        tag2link_items.map(([key, value], idx) => <Link className='colored-tag-button button' style={{
          background: "hsl(" + (idx * 15 + base_color) % 360
            + "," + 90 + "% ,"
            + brightness + "%)"
        }} key={key} href={value}>{key}</Link>)
      }
    </div>
  )
}

export default function BlogArchivePageWrapper(props) {
  // console.log(props.archive)
  const graph = getTagGraphOf(props)
  const years = listPostsByYears(props.archive.blogPosts);
  return (
    <Layout title="Posts relations">
      <div
        className="hero hero--primary"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <h1>Archive Overview</h1>
      </div>
      <div className='outer' style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '30px',
        marginBottom: '30px',
        gap: '30px'
      }}>
        <div className='by_tags' style={{ alignSelf: 'center', marginLeft: "10px", marginRight: "10px", }}>
          <h2 style={{ textAlign: 'center' }}>View By Tags</h2>
          <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
            <BrowserOnly children={() => <ListOfTags posts={props.archive.blogPosts} />} />
          </div>
        </div>
        <div className='by_years'>
          <h2 style={{ textAlign: 'center', marginLeft: "20px", marginRight: "20px" }}>View By Years</h2>
          <main>{years.length > 0 && <YearsSection years={years} />}</main>
        </div>
        <div className='by_graph'>
          <h2 style={{ textAlign: 'center', marginLeft: "20px", marginRight: "20px" }}>View By Graph</h2>
          <div style={{ width: "100%" }}>
            <BlogRelationGraph graph={graph} />
          </div>
        </div>
      </div>
    </Layout>
  );
}