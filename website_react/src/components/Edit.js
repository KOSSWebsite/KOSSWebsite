import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const MarkdownEditor = () => {
  const [title, setTitle] = useState(""); // 제목
  const [markdown, setMarkdown] = useState(""); // 내용
  const [img, setImg] = useState(""); // 이미지 URL
  const [dueDate, setDueDate] = useState(""); // 기한

  // ✅ POST 요청 함수
  const handleSubmit = async () => {
    if (!title || !markdown || !dueDate) {
      alert("제목, 내용, 기한을 모두 입력해주세요!");
      return;
    }

    const postData = {
      title,
      content: markdown,
      img,
      dueDate,
    };

    try {
      const response = await fetch("http://localhost:8080/notice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("공지사항이 등록되었습니다!");
        setTitle("");
        setMarkdown("");
        setImg("");
        setDueDate("");
      } else {
        alert("등록 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("서버 오류 발생!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* 상단: 제목 & 기한 입력 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
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
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            outline: "none",
          }}
        />
      </div>

      {/* 이미지 업로드 */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          placeholder="이미지 URL 입력"
          style={{
            flex: 1,
            padding: "10px",
            fontSize: "14px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
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
          onClick={handleSubmit}
        >
          등록
        </button>
      </div>

      {/* 본문 입력 */}
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="내용을 입력하세요"
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
      <h2 style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "bold", textAlign: "center" }}>미리보기</h2>

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
