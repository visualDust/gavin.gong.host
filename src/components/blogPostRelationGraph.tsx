import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";
import { useHistory } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";

type EChartsOption = echarts.EChartsOption;

interface GraphNode {
  symbolSize: number;
  label?: {
    show?: boolean;
  };
}

export default function BlogRelationGraph({ graph }) {
  const refContainer = useRef();
  const history = useHistory();
  const colorMode = useColorMode();

  useEffect(() => {
    var chartDom = refContainer.current!;
    var myChart = echarts.init(chartDom, colorMode.colorMode, {
      renderer: "svg",
    });

    var option: EChartsOption = {
      backgroundColor: "transparent",
      tooltip: {},
      legend: [
        {
          // selectedMode: 'single',
          data: graph.categories.map(function (a: { name: string }) {
            return a.name;
          }),
        },
      ],
      series: [
        {
          type: "graph",
          layout: "force",
          data: graph.nodes,
          links: graph.links,
          categories: graph.categories,
          roam: true,
          label: {
            position: "right",
          },
          force: {
            repulsion: 100,
          },
          lineStyle: {
            curveness: Math.random() * 0.5,
          },
          draggable: true,
        },
      ],
    };

    myChart.setOption(option);

    myChart.on("click", function (params) {
      if (params.dataType === "node") {
        //@ts-ignore
        history.push(params.data.permalink);
      }
    });

    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      myChart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [colorMode.colorMode]);

  return (
    <div // chart
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1000px",
        height: "80vh",
        overflow: "hidden",
        margin: "0 auto",
      }}
      ref={refContainer}
    ></div>
  );
}
