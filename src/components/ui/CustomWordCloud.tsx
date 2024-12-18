"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import D3WordCloud from "react-d3-cloud";

type Props = {
};

const data = [
    { text: "queues", value: 100 },
    { text: "stack", value: 10 },
    { text: "stack", value: 10 },
    { text: "linkedlist", value: 5 },
    { text: "arraylist", value: 15 },
    { text: "arraylist", value: 50 },
    { text: "arraylist", value: 50 },
    { text: "arraylist", value: 150 },
    { text: "trees", value: 70 },
    { text: "graphs", value: 80 },
    { text: "graphs", value: 8 },
    { text: "graphs", value: 18 },
    { text: "graphs", value: 60 },
    { text: "graphs", value: 80 },
]



const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const CustomWordCloud = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <>
      <D3WordCloud
        data ={data}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={theme.theme === "dark" ? "white" : "black"}
        onWordClick={(e, d) => {
          router.push("/quiz?topic=" + d.text);
        }}
      />
    </>
  );
};

export default CustomWordCloud; 