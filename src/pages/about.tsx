import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import arrayShuffle from "array-shuffle";

function About() {
  return (
    <Layout>
      <Friends />
      <p style={{paddingLeft:'20px'}}>The list is random. try to refresh the page.</p>
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

function getFriendsData(): FriendData[] {
  var data: FriendData[] = [
    {
      pic: "https://github.yuuza.net/lideming.png",
      name: "lideming",
      intro: "Building random things with Deno, Node and .NET Core.",
      url: "https://yuuza.net/",
      note: "我的大学同学，某些时候是同事，也有时是队友。全栈/CSGO/EPICS/BFV，有些懒。",
    },
    {
      pic: "https://github.yuuza.net/papercube.png",
      name: "PaperCube",
      intro: "我是废物",
      url: "https://github.com/papercube",
      note: "我的初中高中同学，我在玩泥巴的时候他就在写java了；语言学砖家（各种意义上的）。我们常打MC。",
    },
    {
      pic: "https://github.yuuza.net/VoidmatrixHeathcliff.png",
      name: "Voidmatrix",
      intro: "积淀，分享，传承",
      url: "http://voidmatrix.xyz/",
      note: "素未谋面的大佬，轮子从galgame引擎造到前端，雨露均沾。我们假期一起打MC。",
    },
    {
      pic: "https://github.yuuza.net/redhat123456.png",
      name: "Tanger",
      intro: "赶紧学习",
      url: "https://tanger.ltd/",
      note: "隔壁学院（数学与计算科学）基地的负责人。常见面交流。",
    },
    {
      pic: "https://github.yuuza.net/Therainisme.png",
      name: "Therainisme",
      intro: "赶紧学习",
      url: "https://notebook.therainisme.com/",
      note: "雨神，一出门就下雨。我大学期间的同事，任我社2019级多媒体部部长。网站开发运维专家。",
    },
    {
      pic: "https://github.yuuza.net/coronaPolvo.png",
      name: "coronaPolvo",
      intro: "life is but a span, I use python",
      url: "https://blog.keter.top/",
      note: "科协F4的成员。我大学期间的同事，任我社2019级软件部部长。主攻方向是神经网络攻击。他找女朋友之前我们常一起吃饭。",
    },
    {
      pic: "https://github.yuuza.net/Zerorains.png",
      name: "Zerorains",
      intro: "life is but a span, I use python",
      url: "blog.zerorains.top",
      note: "科协F4的成员。科协恶霸(x)。主攻方向是基于深度学习技术图像分割。他不太喜欢看我抽卡。",
    },
    {
      pic: "https://github.yuuza.net/PommesPeter.png",
      name: "PommesPeter",
      intro: "I want to be strong. But it seems so hard.",
      url: "https://blog.pommespeter.com/",
      note: "科协F4的成员。我大学期间的同事，任我社2019级软件部部长。主攻方向是神经网络攻击。他找女朋友之前我们常一起吃饭。",
    },
  ];
  return arrayShuffle(data);
}

var friendsData = getFriendsData();

function Friends() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(0);
  useEffect(() => {
    return () => {
      setPrevious(current);
    };
  }, [current]);
  return (
    <div className="friends">
      <div style={{ position: "relative" }}>
        <div className="friend-columns">
          {/* Big card showing current selected */}
          <div className="friend-card-outer">
            {previous != current && (
              <FriendCard key={previous} data={friendsData[previous]} fadeout />
            )}
            <FriendCard key={current} data={friendsData[current]} />
          </div>

          <div className="friend-list">
            {friendsData.map((x, i) => (
              <div
                key={x.name}
                className={clsx("friend-item", {
                  current: i == current,
                })}
                onClick={() => setCurrent(i)}
              >
                <img src={x.pic} alt="user profile photo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FriendCard(props: { data: FriendData; fadeout?: boolean }) {
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
            <big>{data.intro}</big>
          </p>
          <p>
            <small>Comment : {data.note}</small>
          </p>
        </div>
        <div className="card__footer">
          <a href={data.url} className="button button--primary button--block">
            Visit
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
