import React from 'react';
import ReadMoreLink from '@theme-original/BlogPostItem/Footer/ReadMoreLink';

export default function ReadMoreLinkWrapper(props) {
  return (
    <>
      <ReadMoreLink className="button button--primary" {...props} />
    </>
  );
}
