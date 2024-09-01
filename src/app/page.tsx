"use client";

import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("dsfsfsd");

  return (
    <textarea
      className="border border-green-600 min-h-80 m-4 w-[90%]"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    ></textarea>
  );
}
