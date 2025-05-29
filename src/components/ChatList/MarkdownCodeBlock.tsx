import React from "react";

import { Prism as SyntaxHighligher } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export const MarkdownCodeBlock = {
  code({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighligher
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighligher>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
