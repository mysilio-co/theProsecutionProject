import { useEffect, useRef } from "react";
import Image from "next/image";
import BasicLayout from "../components/BasicLayout";
import dataHeaderImg from "../../public/approach-data.svg";
import dataImg from "../../public/kite.png";

import { getItemAll, useGarden } from "garden-kit";
import * as d3 from "d3";
import { DCTERMS } from "@inrupt/vocab-common-rdf";
import { getStringNoLocale, getInteger } from "@inrupt/solid-client";
import { LIMEN } from "../vocab.mjs";

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/bubble-chart
function BubbleChart(
  data,
  {
    name = ([x]) => x, // alias for label
    label = name, // given d in data, returns text to display on the bubble
    value = ([, y]) => y, // given d in data, returns a quantitative size
    group, // given d in data, returns a categorical value for color
    title, // given d in data, returns text to show on hover
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links, if any
    width = 640, // outer width, in pixels
    height = width, // outer height, in pixels
    padding = 3, // padding between circles
    margin = 1, // default margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    groups, // array of group names (the domain of the color scale)
    colors = d3.schemeTableau10, // an array of colors (for groups)
    fill = "#ccc", // a static fill color, if no group channel is specified
    fillOpacity = 0.7, // the fill opacity of the bubbles
    stroke, // a static stroke around the bubbles
    strokeWidth, // the stroke width around the bubbles, if any
    strokeOpacity, // the stroke opacity around the bubbles, if any
    svgRef,
  } = {}
) {
  // Compute the values.
  const D = d3.map(data, (d) => d);
  const V = d3.map(data, value);
  const G = group == null ? null : d3.map(data, group);
  const I = d3.range(V.length).filter((i) => V[i] > 0);

  // Unique the groups.
  if (G && groups === undefined) groups = I.map((i) => G[i]);
  groups = G && new d3.InternSet(groups);

  // Construct scales.
  const color = G && d3.scaleOrdinal(groups, colors);

  // Compute labels and titles.
  const L = label == null ? null : d3.map(data, label);
  const T =
    title === undefined ? L : title == null ? null : d3.map(data, title);

  // Compute layout: create a 1-deep hierarchy, and pack it.
  const root = d3
    .pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding)(d3.hierarchy({ children: I }).sum((i) => V[i]));

  const svg = d3
    .select(svgRef.current)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-marginLeft, -marginTop, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("fill", "currentColor")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle");

  const leaf = svg
    .selectAll("a")
    .data(root.leaves())
    .join("a")
    .attr(
      "xlink:href",
      link == null ? null : (d, i) => link(D[d.data], i, data)
    )
    .attr("target", link == null ? null : linkTarget)
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  leaf
    .append("circle")
    .attr("stroke", stroke)
    .attr("stroke-width", strokeWidth)
    .attr("stroke-opacity", strokeOpacity)
    .attr("fill", G ? (d) => color(G[d.data]) : fill == null ? "none" : fill)
    .attr("fill-opacity", fillOpacity)
    .attr("r", (d) => d.r);

  if (T) leaf.append("title").text((d) => T[d.data]);

  if (L) {
    // A unique identifier for clip paths (to avoid conflicts).
    const uid = `O-${Math.random().toString(16).slice(2)}`;

    leaf
      .append("clipPath")
      .attr("id", (d) => `${uid}-clip-${d.data}`)
      .append("circle")
      .attr("r", (d) => d.r);

    leaf
      .append("text")
      .attr(
        "clip-path",
        (d) => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`
      )
      .selectAll("tspan")
      .data((d) => `${L[d.data]}`.split(/\n/g))
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
      .attr("fill-opacity", (d, i, D) => (i === D.length - 1 ? 0.7 : null))
      .text((d) => d);
  }

  return Object.assign(svg.node(), { scales: { color } });
}

function drawChart(svgRef, items) {
  function label(item) {
    const n = getInteger(item, LIMEN.numberOfExamples);
    const m = getStringNoLocale(item, LIMEN.marketSophistication);
    if (n < 5) {
      return `${n} - ${m}`;
    }
    const method = getStringNoLocale(item, LIMEN.method);
    return `${n} - ${m}\n${method.replace(/\ /gi, "\n")}`;
  }

  function title(item) {
    const method = getStringNoLocale(item, LIMEN.method);
    console.log(method)
    return `${getStringNoLocale(item, DCTERMS.bibliographicCitation)}
=========
${getStringNoLocale(item, DCTERMS.abstract)}
=========
Level of sophistication of the market economy (High, Medium, Low): ${getStringNoLocale(
      item,
      LIMEN.marketSophistication
    )}
Number of Examples: ${getInteger(
      item,
      LIMEN.numberOfExamples
      )}
${legend[method].footnote}`;
  }

  function value(item) {
    const n = getInteger(item, LIMEN.numberOfExamples);
    return Math.log10(2*n);
  }

  function group(item) {
    return getStringNoLocale(item, LIMEN.method);
  }

  BubbleChart(items, {
    svgRef,
    title,
    label,
    value,
    group,
    groups: Object.keys(legend),
    colors: ["#84CC16", "#06B6D4", "#F43F5E", "#6366F1"],
  });
}


const legend = {
  "Combination":
  {
    footnote:
      "§ Study based on broader case studies – combining analysis of different sources",
    className: "py-2 text-lime-600",
  },
  "Historical":
  {
    footnote: "‡ Study based on historical studies",
    className: "py-2 text-cyan-600",
  },
  "Contractual Instruments":
  {
    footnote: "† Study based on analysis of contractual instruments",
    className: "py-2 text-rose-600",
  },
  "Survey":
  {
    footnote: "* Study based on Surveys/Questionnaires/Interviews",
    className: "py-2 text-indigo-600",
  },
};

const FOUOUrl = "https://tpp.mysilio.me/public/data/FOUO.ttl";
const PendingUrl= "https://tpp.mysilio.me/public/data/pending.ttl";

const D3DataDisplay = () => {
  const svg = useRef(null);
  const { garden } = useGarden(ContractsDatasetUrl);
  const items = garden && getItemAll(garden);

  useEffect(() => {
    if (items) {
      console.log(items);
      drawChart(svg, items);
    }
  }, [items, svg]);

  return (
    <div className="px-44">
      <h5 className="uppercase font-bold font-body text-xl">Sample</h5>
      <h3 className="uppercase font-bold font-body text-3xl">
        DATABASE OF EMPIRICAL STUDIES CONCERNING CONTRACTUAL PRACTICES IN THE
        MARKET ECONOMY
      </h3>
      <p>
        <span className="font-bold">Summary:</span> 55 empirical studies on
        contracting practices, combining different approaches and methodologies:
        12 studies collecting either interviews, surveys and questionnaires; 18
        studies analyzing contractual instruments; 6 historical studies; and 19
        broader case studies, combining different methodologies simultaneously
        (such as collection of documents, interviews, use of questionnaires,
        observations, etc).
      </p>
      <div className="flex flex-row items-center gap-30">
        <div className="w-[640px] h-[640px] flex flex-col justify-center">
          <svg ref={svg} />
        </div>
        <div>
          {Object.values(legend).map(({ footnote, className }) => {
            return (
              <div id={footnote} className={className}>
                {footnote}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function Data() {
  return (
    <>
      <div className="bg-paper bg-cover flex flex-row justify-between items-center h-screen pt-96">
        <div className="ml-44 my-44">
          <h2 className="block text-5xl font-display font-semibold">
            Magic of
          </h2>
          <h1 className="text-[140px] leading-[170px] font-display font-semibold w-1/2">
            Data
          </h1>
        </div>
      </div>
      <div className="px-44">
        <div className="flex flex-row items-center gap-30">
          <div>
            <h5 className="uppercase font-bold font-body text-xl">Collected</h5>

            <h3 className="uppercase font-bold font-body text-6xl">Data</h3>
            <p>
              How to think about economics. Our approach with LIMEN is to join
              the dots between law, economics, psychology, philosophy, sociology
              and the cognitive sciences, to create new solutions to today’s
              pressing issues.
            </p>
          </div>
          <div className="w-[630px] h-[630px] flex flex-col justify-center">
            <Image src={dataImg} />
          </div>
        </div>
      </div>
      <D3DataDisplay />
    </>
  );
}
