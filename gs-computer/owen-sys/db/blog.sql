-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2019-10-18 12:33:41
-- 服务器版本： 5.7.24
-- PHP 版本： 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `blog`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(18) NOT NULL,
  `power` int(3) NOT NULL DEFAULT '1',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` int(2) NOT NULL DEFAULT '2',
  `layout` int(2) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `abstract` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` int(3) NOT NULL DEFAULT '1',
  `itemName` varchar(255) NOT NULL,
  `collectionNum` int(10) NOT NULL DEFAULT '0',
  `commentNum` int(10) NOT NULL DEFAULT '0',
  `shareNum` int(10) DEFAULT '0',
  `zanNum` int(10) NOT NULL DEFAULT '0',
  `readNum` int(10) NOT NULL DEFAULT '0',
  `authorName` varchar(255) NOT NULL,
  `authorId` int(16) NOT NULL,
  `coverType` int(3) NOT NULL DEFAULT '1',
  `coverUrl` varchar(255) NOT NULL,
  `showBg` int(3) NOT NULL DEFAULT '1',
  `bgUrl` varchar(255) NOT NULL,
  `showBgColor` int(3) NOT NULL DEFAULT '1',
  `bgColor` varchar(20) NOT NULL,
  `iconType` int(3) NOT NULL DEFAULT '1',
  `eventType` int(3) NOT NULL DEFAULT '1',
  `tags` json NOT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `videoDesc` varchar(255) NOT NULL,
  `videoSource` varchar(255) NOT NULL,
  `videoCover` varchar(255) NOT NULL,
  `musicUrl` varchar(255) NOT NULL,
  `musicCover` varchar(255) NOT NULL,
  `musicAuthor` varchar(255) NOT NULL,
  `musicDesc` varchar(255) NOT NULL,
  `contentImgUrl` varchar(255) NOT NULL,
  `contentImgUrls` json NOT NULL,
  `layout` int(3) NOT NULL DEFAULT '1',
  `showArticle` int(3) NOT NULL DEFAULT '1',
  `sortOrder` int(3) NOT NULL DEFAULT '1',
  `preArticle` int(16) NOT NULL,
  `nextArticle` int(16) NOT NULL,
  `bgUrls` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=gb2312;

-- --------------------------------------------------------

--
-- 表的结构 `test`
--

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT 'username',
  `age` int(3) DEFAULT '18',
  `sex` int(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=gb2312;

--
-- 转存表中的数据 `test`
--

INSERT INTO `test` (`id`, `name`, `age`, `sex`) VALUES
(1, 'username', 18, 1),
(2, 'username1', 20, 2),
(3, 'test', 22, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(18) NOT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `collectionNum` int(16) NOT NULL DEFAULT '0',
  `zanNum` int(16) NOT NULL DEFAULT '0',
  `commentNum` int(16) NOT NULL DEFAULT '0',
  `shareNum` int(16) NOT NULL DEFAULT '0',
  `level` int(3) NOT NULL DEFAULT '1',
  `type` int(3) NOT NULL DEFAULT '1',
  `layout` int(3) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=gb2312;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `nickname`, `avatar`, `account`, `password`, `createTime`, `updateTime`, `collectionNum`, `zanNum`, `commentNum`, `shareNum`, `level`, `type`, `layout`) VALUES
(1, '123', 'http://img.oyxco.com/avatar.jpg', 'testy1', '112233', '2019-10-15 14:38:57', '2019-10-15 14:38:57', 0, 0, 0, 0, 1, 1, 1),
(2, '123', 'http://img.oyxco.com/avatar.jpg', 'testy1', '112233', '2019-10-15 14:39:40', '2019-10-15 14:39:40', 0, 0, 0, 0, 1, 1, 1),
(3, '123', 'http://img.oyxco.com/avatar.jpg', 'testy1', '112233', '2019-10-15 14:52:38', '2019-10-15 14:52:38', 0, 0, 0, 0, 1, 1, 1),
(4, '123', 'http://img.oyxco.com/avatar.jpg', 'test2', '112233', '2019-10-15 14:54:26', '2019-10-15 14:54:26', 0, 0, 0, 0, 1, 1, 1),
(5, '123', 'http://img.oyxco.com/avatar.jpg', 'test3', '112233', '2019-10-15 14:56:54', '2019-10-15 14:56:54', 0, 0, 0, 0, 1, 1, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
