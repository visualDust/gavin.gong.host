import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";

function About() {
  return (
    <Layout>
      <Friends />
    </Layout>
  );
}

interface FriendData {
  pic: string;
  name: string;
  intro: string;
  url: string;
  note: string;
}

const friendsData: FriendData[] = [
  {
    pic: "https://avatars.githubusercontent.com/u/33346934?v=4",
    name: "ViusalDust",
    intro: "Rubbish CVer | Poor LaTex speaker | Half stack developer | 键圈躺尸砖家",
    url: "https://github.com/visualDust",
    note: "Building random things with Deno, Node and .NET Core.",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
  {
    pic: "https://avatars.githubusercontent.com/u/14901890?v=4",
    name: "lideming",
    intro: "Building random things with Deno, Node and .NET Core.",
    url: "test2",
    note: "test2",
  },
];

function Friends() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  useEffect(() => {
    return () => {
      setPrevious(current);
    }
  }, [current])
  return (
    <div className="friends">
      <div style={{ position: 'relative' }}>
        <div className="friend-columns">
          {/* Big card showing current selected */}
          <div className="friend-card-outer">
            {previous != current && <FriendCard key={previous} data={friendsData[previous]} fadeout />}
            <FriendCard key={current} data={friendsData[current]} />
          </div>

          <div className="friend-list">
            {friendsData.map((x, i) => (
              <div key={x.name} className={clsx('friend-item', {
                current: i == current
              })} onClick={() => setCurrent(i)}>
                <img src={x.pic} alt="user profile photo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FriendCard(props: { data: FriendData, fadeout?: boolean }) {
  const { data, fadeout = false } = props;
  return (
    <div className={clsx("friend-card", { fadeout })}>
      <div className="card">
        <div className="card__image">
          <img
            src={data.pic}
            alt="User profile photo"
            title="User profile photo"
          />
        </div>
        <div className="card__body">
          <h2>{data.name}</h2>
          <p>
            <big>
              {data.intro}
            </big>
          </p>
          <p>
            <small>
              {data.note}
            </small>
          </p>
        </div>
        <div className="card__footer">
          <a href={data.url} className="button button--primary button--block">
            Visit
          </a>
        </div>
      </div>
    </div>
  )
}

export default About;
