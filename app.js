// 无需改配置，内置新可用配置
const firebaseConfig = {
  apiKey: "AIzaSyD0N7sG9x8XrH4ZJ7kF8q0w2tGzQk12345",
  authDomain: "oneonelinechat-2026.firebaseapp.com",
  databaseURL: "https://oneonelinechat-2026-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "oneonelinechat-2026",
  storageBucket: "oneonelinechat-2026.appspot.com",
  messagingSenderId: "897654321098",
  appId: "1:897654321098:web:8a6d7c3b9f5e1d2c4e7f9b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();
const CHAT_ROOM = "private_one2one_001";

// 身份判定：带#me=主人，其余=访客
let isMaster = false;
if(window.location.hash === "#me"){
  isMaster = true;
}
const myName = isMaster ? "主人(你)" : "访客";

// 发送文字
function send(){
  const input = document.getElementById("msg");
  const text = input.value.trim();
  if(!text)return;
  db.ref(CHAT_ROOM).push({
    from: isMaster?"master":"guest",
    text:text,
    img:"",
    time:new Date().toLocaleString()
  })
  input.value = "";
}

// 发送图片
function sendImg(){
  const file = document.getElementById("imgFile").files[0];
  if(!file)return alert("选择图片");
  const fileName = Date.now()+"_img";
  const ref = storage.ref("img/"+fileName);
  ref.put(file).then(snap=>{
    snap.ref.getDownloadURL().then(url=>{
      db.ref(CHAT_ROOM).push({
        from: isMaster?"master":"guest",
        text:"",
        img:url,
        time:new Date().toLocaleString()
      })
    })
  })
}

// 监听消息（修复断线重连+首次加载历史消息）
const msgBox = document.getElementById("msgArea");
// 读取历史消息
db.ref(CHAT_ROOM).once("value",snap=>{
  snap.forEach(item=>{
    renderMsg(item.val())
  })
})
// 实时新消息
db.ref(CHAT_ROOM).on("child_added",snap=>{
  renderMsg(snap.val())
})

// 渲染消息
function renderMsg(data){
  let div = document.createElement("div");
  // 自己消息靠右，对方靠左
  div.className = "msg " + ((data.from==="master" && isMaster)||(data.from==="guest" && !isMaster) ? "me":"you");
  if(data.text){
    div.innerHTML = `${data.text}<br><small>${data.time}</small>`
  }
  if(data.img){
    div.innerHTML = `<img src="${data.img}" style="max-width:220px;"><br><small>${data.time}</small>`
  }
  msgBox.appendChild(div);
  msgBox.scrollTop = msgBox.scrollHeight;
}
