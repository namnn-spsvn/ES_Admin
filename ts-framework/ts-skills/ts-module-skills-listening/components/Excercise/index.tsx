"use client";

import { useParams } from "next/navigation";
import React from "react";

function Excercise() {
  const params = useParams();
  const { topic, level, id } = params;

  return (
    <div>
      <h1> Chủ đề: {decodeURIComponent(topic)}</h1>
      <p> Cấp độ: {level}</p>
      <p> ID: {id}</p>
    </div>
  );
}

export default Excercise;
