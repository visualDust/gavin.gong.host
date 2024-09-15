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
  const refContainer = useRef<HTMLDivElement>();
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
          width: "1000px",
        },
      ],
      series: [
        {
          name: "click to view:",
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
            repulsion: 300,
            gravity: 0.2,
            layoutAnimation: true,
            friction: 0.1,
          },
          lineStyle: {
            curveness: Math.random() * 0.3,
            width: 2,
          },
          autoCurveness: true,
          draggable: true,
          scaleLimit: {
            min: 1,
            max: 10,
          },
          itemStyle: {
            shadowColor: "#666",
            shadowBlur: 3,
          },
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

    const updateWidth = () => {
      const width = refContainer.current!.clientWidth;
      myChart.setOption({
        legend: [
          {
            width: width > 1000 ? "980px" : width - 20 + "px",
          },
        ],
      });
    };
    updateWidth();

    const handleResize = () => {
      myChart.resize();
      updateWidth();
    };
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
        height: "80vh",
        overflow: "hidden",
        margin: "0 auto",
      }}
      ref={refContainer}
    ></div>
  );
}
