import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
import { PageMetadata } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
export default function NotFound() {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: 'Page Not Found',
        })}
      />
      <Layout>
        <div style={{
          margin:"10px",
          marginTop:"50px",
          display:"flex",
          flexDirection:"row",
          justifyContent:"center"
        }}>
        <div style={{
          flexDirection: "column",
          maxWidth: "800px"
        }}>
          <div>
            <h1 className="hero__title">
              <Translate
                id="theme.NotFound.title"
                description="The title of the 404 page">
                Oops, where's the page?
              </Translate>
            </h1>
          </div>
          <div>
          <p style={{margin:"0"}}>
              <Translate
                id="theme.NotFound.p1"
                description="The first paragraph of the 404 page">
                Sorry for the inconvenience, but I could not find what you were looking for.
              </Translate>
            </p>
            <p style={{margin:"0"}}>
              <Translate
                id="theme.NotFound.p2"
                description="The 2nd paragraph of the 404 page">
                This may be because I'm editing this section or I haven't finished the page yet, or the link is broken.
              </Translate>
            </p>
          </div>
          <img src='/img/notfound_octopus.png' style={{
            borderRadius: "20px",
            marginTop:"20px"
          }} />
        </div>
        </div>
      </Layout>
    </>
  );
}
