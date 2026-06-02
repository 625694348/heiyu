CREATE DATABASE IF NOT EXISTS nav;
USE nav;

CREATE TABLE IF NOT EXISTS category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS links (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cid INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NULL
);

-- 初始化数据
INSERT INTO category (name) VALUES ('常用工具'),('视频娱乐'),('开发技术'),('设计资源');

INSERT INTO links (cid,title,url,icon) VALUES
(1,'百度','https://www.baidu.com',''),
(1,'知乎','https://www.zhihu.com',''),
(2,'哔哩哔哩','https://www.bilibili.com',''),
(2,'腾讯视频','https://v.qq.com',''),
(3,'GitHub','https://github.com',''),
(3,'Gitee','https://gitee.com','');
