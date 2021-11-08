
import React from "react";

export function GithubFeatures(): JSX.Element {
  return (
    <div style={{ height: '100%'}}>
      <div className="container">
        <div className="column" style={{ height: "100%", alignItems: "end" }}>
          <div className="text--center col col--6">
            <h1 className="h2">Recent activities</h1>
          </div>
          <div className="text--center col col--6">
            <img src="https://ghchart.rshah.org/409ba5/visualdust" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
