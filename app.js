// ==============================================
// 国内直连 · 一对一聊天 · 无 Firebase 永久版
// ==============================================
const CHANNEL = "chat_your_private_1v1"; // 固定房间
const isMe = window.location.hash === "#me"; // 自动判断身份

const msgList = document.getElementById("msgList");
const msgInput = document.getElementById("msg");
const imgInput = document.getElementById("imgFile");

// 发送文字
function sendText() {
  const text = msgInput.value.trim();
  if (!text) return;
  pushMsg({ type: "text", content: text });
  msgInput.value = "";
}

// 发送图片（上传公共图床）
async function sendImg() {
  const file = imgInput.files[0];
  if (!file) return alert("请选择图片");

  let form = new FormData();
  form.append("file", file);

  try {
    let res = await fetch("https://pic.chaohang.fun/api/upload", {
      method: "POST",
      body: form
    });
    let data = await res.json();
    if (data.url) {
      pushMsg({ type: "img", content: data.url });
    }
  } catch (e) {
    alert("图片发送失败");
  }
  imgInput.value = "";
}

// 推送到消息通道
async function pushMsg(data) {
  let res = await fetch(`https://api.jsonbin.io/v3/b/65eec86a1f567721a05c1234`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": "$2b$10$A1bC2dE3fG4hI5jK6lL7M8n9oP0qR1sT2uV3wX4yZ5aB6cD7eF8gH9i0J1k"
    },
    body: JSON.stringify({
      from: isMe ? "master" : "guest",
      type: data.type,
      content: data.content,
      time: new Date().toLocaleString()
    })
  });
}

// 拉取消息（自动轮询）
async function getMsg() {
  try {
    let res = await fetch(`https://api.jsonbin.io/v3/b/65eec86a1f567721a05c1234`, {
      headers: {
        "X-Master-Key": "$2b$10$A1bC2dE3fG4hI5jK6lL7M8n9oP0qR1sT2uV3wX4yZ5aB6cD7eF8gH9i0J1k"
      }
    });
    let data = await res.json();
    renderMsg(data.record);
  } catch (e) {}
}

// 渲染消息
function renderMsg(msg) {
  if (!msg) return;
  if (window.lastMsg === msg.time) return;
  window.lastMsg = msg.time;

  let div = document.createElement("div");
  let isMyMsg = (msg.from === "master" && isMe) || (msg.from === "guest" && !isMe);
  div.className = "msg " + (isMyMsg ? "me" : "you");

  if (msg.type === "text") {
    div.innerHTML = `${msg.content}<br><small>${msg.time}</small>`;
  }
  if (msg.type === "img") {
    div.innerHTML = `<img src="${msg.content}"><br><small>${msg.time}</small>`;
  }

  msgList.appendChild(div);
  msgList.scrollTop = msgList.scrollHeight;
}

// 自动刷新消息（每秒查一次）
setInterval(getMsg, 1000);
getMsg();
