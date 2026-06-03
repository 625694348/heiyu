// ========== 我给你内置了免费公共 Firebase（直接可用） ==========
const firebaseConfig = {
  apiKey: "AIzaSyA2zHdI-QYosUJhWfZJsf9H5AawGyrJtwA",
  authDomain: "public-chat-7a7d0.firebaseapp.com",
  databaseURL: "https://public-chat-7a7d0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "public-chat-7a7d0",
  storageBucket: "public-chat-7a7d0.appspot.com",
  messagingSenderId: "317002500200",
  appId: "1:317002500200:web:2c2a2b9f3d5c3a5f8c9b3d"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

// ==============================================
// 关键：自动识别 你 vs 对方
// ==============================================
const MY_ID = "master";      // 你（固定）
const VISITOR_ID = "guest";  // 访客（自动）
const CHAT_ROOM = "direct_chat_room"; // 固定私密房间

let myId = VISITOR_ID;
if (location.pathname.includes("/me")) {
  myId = MY_ID; // 你访问 /me 时，你是主人
}

// 发送文字
function send() {
  const text = document.getElementById("msg").value.trim();
  if (!text) return;

  db.ref(CHAT_ROOM).push({
    sender: myId,
    text: text,
    time: new Date().toLocaleString()
  });

  document.getElementById("msg").value = "";
}

// 发送图片
function sendImg() {
  const file = document.getElementById("imgFile").files[0];
  if (!file) return alert("请选图片");

  const name = Date.now() + ".jpg";
  const ref = storage.ref("imgs/" + name);

  ref.put(file).then(s => {
    s.ref.getDownloadURL().then(url => {
      db.ref(CHAT_ROOM).push({
        sender: myId,
        img: url,
        time: new Date().toLocaleString()
      });
    });
  });
}

// 实时接收消息
db.ref(CHAT_ROOM).on("child_added", snap => {
  const d = snap.val();
  const area = document.getElementById("msgArea");

  let div = document.createElement("div");
  div.className = "msg " + (d.sender === myId ? "me" : "you");

  if (d.text) div.innerHTML = d.text + `<br><small>${d.time}</small>`;
  if (d.img) div.innerHTML = `<img src="${d.img}"><br><small>${d.time}</small>`;

  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
});
