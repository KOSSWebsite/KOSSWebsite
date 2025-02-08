import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(`<!-- 필요한 부분을 복사해 바로 사용하세요!
## 1️⃣ 제목(Header)
# 제목 1
## 제목 2
### 제목 3
#### 제목 4

---

## 2️⃣ 텍스트 스타일 (Text Styles)
**굵은 글씨**  
*기울임 글씨*  
~~취소선~~  

---

## 3️⃣ 리스트 (Lists)
### 🔹 순서 없는 리스트
- 항목 1
- 항목 2
  - 하위 항목 2-1
  - 하위 항목 2-2
- 항목 3

### 🔸 순서 있는 리스트
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

---

## 4️⃣ 링크 & 이미지 (Links & Images)
[Google로 이동](https://www.google.com)

![이미지 예제](https://via.placeholder.com/150)

---

## 5️⃣ 코드 블록 (Code Blocks)
\`\`\`js
// JavaScript 코드 예제
console.log("Hello, Markdown!");
-->
  `);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Markdown Editor</h1>

      <textarea
        rows="10"
        cols="50"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontFamily: "inherit",
        }}
      />

      <h2>Markdown 미리보기</h2>
      <div
        className="markdown-preview"
        style={{
          border: "1px solid #ddd",
          borderRadius: "5px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          whiteSpace: "pre-wrap",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 style={{ fontSize: "2rem", fontWeight: "bold" }} {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 style={{ fontSize: "1.75rem", fontWeight: "bold" }} {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }} {...props} />
            ),
            h4: ({ node, ...props }) => (
              <h4 style={{ fontSize: "1.25rem", fontWeight: "bold" }} {...props} />
            ),
              ul: ({ node, ...props }) => (
              <ul style={{ marginLeft: "20px", listStyleType: "disc" }} {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol style={{ marginLeft: "20px", listStyleType: "decimal" }} {...props} />
            ),
            li: ({ node, ...props }) => (
              <li style={{ marginBottom: "5px" }} {...props} />
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
