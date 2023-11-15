import React from 'react';
import BlogArchivePage from '@theme-original/BlogArchivePage';

export default function BlogArchivePageWrapper(props) {
  console.log(props)
  return (
    <>
      <BlogArchivePage {...props} />
    </>
  );
}
