// utils/renderBlocks.jsx

export function renderBlocks(blocks) {
  if (!blocks) return null;

  if (typeof blocks === "string") {
    return <div dangerouslySetInnerHTML={{ __html: blocks }} />;
  }

  if (Array.isArray(blocks)) {
    return blocks.map((block, i) => {
      switch (block.type) {
        case "paragraph":
          return (
            <p key={i}>
              {block.children?.map((child) => child.text).join(" ")}
            </p>
          );
        case "heading":
          return (
            <h2 key={i}>
              {block.children?.map((child) => child.text).join(" ")}
            </h2>
          );
        case "quote":
          return (
            <blockquote key={i}>
              {block.children?.map((child) => child.text).join(" ")}
            </blockquote>
          );
        case "list":
          return (
            <ul key={i}>
              {block.children?.map((child, j) => (
                <li key={j}>{child.text}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  }

  return null;
}
