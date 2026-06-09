"use client";

import { useState } from "react";

export function ShareWonder({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(`${title} — Wonder Why Daily`);
  const encodedUrl = encodeURIComponent(url);

  async function copyLink() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
    } else {
      const input = document.createElement("textarea");
      input.value = url;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="share-wonder" aria-labelledby="share-wonder-heading">
      <div>
        <p className="section-kicker">Pass the wonder along</p>
        <h2 id="share-wonder-heading">Share this question</h2>
      </div>
      <div className="share-links">
        <button onClick={copyLink} type="button">
          {copied ? "Link copied" : "Copy link"}
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          X / Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          rel="noreferrer"
          target="_blank"
        >
          Facebook
        </a>
        <a href={`mailto:?subject=${text}&body=${encodedUrl}`}>Email</a>
      </div>
      <p className="share-status" role="status">
        {copied ? "Link copied to your clipboard." : ""}
      </p>
    </section>
  );
}
