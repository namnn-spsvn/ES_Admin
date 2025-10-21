"use client";

import { useParams } from "next/navigation";
import React from "react";
import BegginerExcercise from "./Begginer";

function Excercise() {
  const params = useParams();
  const { topic, level, id } = params;

  return <>{level === "begginer" && <BegginerExcercise />}</>;
}

export default Excercise;
