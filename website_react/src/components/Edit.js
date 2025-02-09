import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownEditor = () => {
  const [title, setTitle] = useState(""); // 제목 상태
  const [markdown, setMarkdown] = useState(`필요한 부분을 복사해 바로 사용하세요!
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
<center>
중앙정렬
</center>

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
\`\`\`

`);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 상단: 제목 입력 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* 제목 필드 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "24px",
            fontWeight: "bold",
            border: "none",
            borderBottom: "1px solid #ddd",
            outline: "none",
            marginRight: "20px",
            textAlign: "center",
          }}
        />
        {/* 버튼들 */}
        <button
          style={{
            padding: "10px 15px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          이미지 업로드
        </button>
        <button
          style={{
            padding: "10px 15px",
            fontSize: "14px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          등록
        </button>
      </div>

      {/* 본문 입력 */}
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="내용을 써주세요"
        style={{
          width: "100%",
          height: "300px",
          padding: "15px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          resize: "none",
          marginBottom: "20px",
        }}
      />

      {/* 미리보기 제목 */}
      <h2 style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "bold", textAlign: "center"}}>미리보기</h2>

      {/* 미리보기 */}
      <div
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
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  style={{
                    backgroundColor: "#f4f4f4",
                    padding: "2px 5px",
                    borderRadius: "5px",
                  }}
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
