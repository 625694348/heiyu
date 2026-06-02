<?php include 'config.php'; ?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>简约导航 - 3yue导航</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto}
body{background:#f5f7fa;padding-bottom:50px}
.container{max-width:1100px;margin:0 auto;padding:20px}
.logo{text-align:center;font-size:28px;font-weight:700;margin:40px 0 20px;color:#222}
.search{display:flex;justify-content:center;gap:10px;margin-bottom:40px}
.search input{width:600px;max-width:80%;height:50px;border-radius:25px;border:1px solid #e4e7ed;padding:0 20px;outline:0;font-size:16px}
.search button{height:50px;padding:0 25px;border-radius:25px;background:#0077fe;color:white;border:none;cursor:pointer}
.box{margin-bottom:30px}
.title{font-size:17px;font-weight:600;margin-bottom:12px;color:#333}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px}
.item{background:white;border-radius:12px;padding:14px 10px;text-align:center;text-decoration:none;color:#333;box-shadow:0 2px 5px #00000006}
.item:hover{background:#eef7ff}
footer{text-align:center;margin-top:50px;color:#999;font-size:14px}
</style>
</head>
<body>
<div class="container">
<div class="logo">简约导航</div>
<div class="search">
<input type="text" id="w" placeholder="搜索">
<button onclick="go()">搜索</button>
</div>

<?php
$cat = mysqli_query($conn,"SELECT * FROM category");
while($c = mysqli_fetch_assoc($cat)){
echo "<div class='box'>";
echo "<div class='title'>{$c['name']}</div>";
echo "<div class='grid'>";
$cid = $c['id'];
$link = mysqli_query($conn,"SELECT * FROM links WHERE cid=$cid");
while($l = mysqli_fetch_assoc($link)){
echo "<a class='item' href='{$l['url']}' target='_blank'>{$l['title']}</a>";
}
echo "</div></div>";
}
?>

<footer>© 2025 简约导航</footer>
</div>

<script>
function go(){
let w = document.getElementById('w').value;
if(w) window.open('https://www.baidu.com/s?wd='+encodeURIComponent(w))
}
document.getElementById('w').onkeydown=function(e){
if(e.keyCode==13) go()
}
</script>
</body>
</html>
