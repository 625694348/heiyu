<?php
include 'config.php';

// 添加分类
if(isset($_POST['add_cat'])){
$name = $_POST['name'];
mysqli_query($conn,"INSERT INTO category(name) VALUES('$name')");
header("location:admin.php");
exit;
}

// 添加链接
if(isset($_POST['add_link'])){
$cid = $_POST['cid'];
$title = $_POST['title'];
$url = $_POST['url'];
mysqli_query($conn,"INSERT INTO links(cid,title,url) VALUES('$cid','$title','$url')");
header("location:admin.php");
exit;
}
?>
<!DOCTYPE html>
<meta charset="UTF-8">
<title>后台管理</title>
<style>
body{max-width:800px;margin:30px auto;padding:20px;font-family:system-ui}
h2,h3{color:#333}
form{background:#f9f9f9;padding:15px;margin:10px 0;border-radius:10px}
input,select{padding:8px;width:200px;margin-right:5px}
button{padding:8px 15px;background:#0077fe;color:white;border:none;border-radius:6px}
.item{padding:6px 0}
</style>
<h2>导航后台管理</h2>

<h3>添加分类</h3>
<form method="post">
<input name="name" placeholder="分类名称" required>
<button name="add_cat">添加</button>
</form>

<h3>添加链接</h3>
<form method="post">
<select name="cid" required>
<?php
$ca = mysqli_query($conn,"SELECT * FROM category");
while($c=mysqli_fetch_assoc($ca)){
echo "<option value='{$c['id']}'>{$c['name']}</option>";
}
?>
</select>
<input name="title" placeholder="网站名" required>
<input name="url" placeholder="网址" required>
<button name="add_link">添加</button>
</form>
