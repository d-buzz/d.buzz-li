/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 10.4.14-MariaDB : Database - dbuzz_li
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dbuzz_li` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `dbuzz_li`;

/*Table structure for table `urls` */

CREATE TABLE `urls` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(200) NOT NULL,
  `url` text NOT NULL,
  `title` text DEFAULT NULL,
  `ip` varchar(41) NOT NULL,
  `clicks` int(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`,`keyword`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `urls` */

/*Table structure for table `whitelisted_domains` */

CREATE TABLE `whitelisted_domains` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `domain` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

/*Data for the table `whitelisted_domains` */

insert  into `whitelisted_domains`(`id`,`domain`,`is_active`,`created_at`,`updated_at`) values (1,'d.buzz',1,'2020-11-27 04:37:21','2020-11-27 04:37:21'),(2,'hive.blog',1,'2020-11-27 04:37:39','2020-11-27 04:37:39'),(3,'peakd.com',1,'2020-11-27 04:38:12','2020-11-27 04:38:12');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
