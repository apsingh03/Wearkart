-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bm1vynnmscycszuwhkzm-mysql.services.clever-cloud.com:3306
-- Generation Time: Jul 12, 2024 at 07:15 PM
-- Server version: 8.0.22-13
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bm1vynnmscycszuwhkzm`
--

-- --------------------------------------------------------

--
-- Table structure for table `AdminAuths`
--

CREATE TABLE `AdminAuths` (
  `id` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `AdminAuths`
--

INSERT INTO `AdminAuths` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin Singh', 'admin@gmail.com', '$2b$10$1IaTLWpltAuPcZqHEm9I3eA1dSaUITPvCmJqqsVStWNhxf1X1TtlO', '2024-07-08 18:52:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `isFavorite` tinyint(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `admin_id`, `isFavorite`, `createdAt`, `updatedAt`) VALUES
(5, 'Blazers', 1, 1, '2024-07-10 12:24:12', NULL),
(6, 'Co-ords', 1, 0, '2024-07-10 12:24:20', NULL),
(7, 'Dresses', 1, 0, '2024-07-10 12:24:26', NULL),
(8, 'Jackets', 1, 0, '2024-07-10 12:24:34', NULL),
(9, 'Jeans', 1, 0, '2024-07-10 12:24:40', NULL),
(10, 'LivIn Pants', 1, 0, '2024-07-10 12:24:46', NULL),
(11, 'Shirts', 1, 0, '2024-07-10 12:24:55', NULL),
(12, 'Shorts', 1, 1, '2024-07-10 12:25:01', NULL),
(13, 'Skirts', 1, 0, '2024-07-10 12:25:08', NULL),
(14, 'Skorts', 1, 0, '2024-07-10 12:25:15', NULL),
(15, 'Sweatshirt', 1, 0, '2024-07-10 12:25:26', NULL),
(16, 'T-shirts', 1, 0, '2024-07-10 12:25:32', NULL),
(17, 'Tops', 1, 0, '2024-07-10 12:25:40', NULL),
(18, 'Trousers', 1, 0, '2024-07-10 12:25:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `childFilters`
--

CREATE TABLE `childFilters` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `childFilters`
--

INSERT INTO `childFilters` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`, `parent_id`) VALUES
(7, 'Blazers', 1, '2024-07-10 09:05:26', NULL, 2),
(8, 'T-Shirts', 1, '2024-07-10 09:05:57', NULL, 2),
(9, 'Jeans', 1, '2024-07-10 09:06:34', NULL, 2),
(10, 'Shirts', 1, '2024-07-10 09:06:45', NULL, 2),
(11, 'Red', 1, '2024-07-10 09:07:00', NULL, 3),
(12, 'Green', 1, '2024-07-10 09:07:14', NULL, 3),
(13, 'Blue', 1, '2024-07-10 09:07:20', NULL, 3),
(14, 'Orange', 1, '2024-07-10 09:07:27', NULL, 3),
(15, 'Cotton', 1, '2024-07-10 09:07:44', NULL, 4),
(16, 'Woolean', 1, '2024-07-10 09:07:52', NULL, 4),
(17, 'Silk', 1, '2024-07-10 09:08:01', NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `childMenus`
--

CREATE TABLE `childMenus` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `parent_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `childMenus`
--

INSERT INTO `childMenus` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`, `parent_id`) VALUES
(1, 'son 1 ', 1, '2024-07-10 08:59:31', NULL, 2),
(2, 'four', 1, '2024-07-10 09:02:02', '2024-07-10 09:03:57', 2);

-- --------------------------------------------------------

--
-- Table structure for table `clientAuths`
--

CREATE TABLE `clientAuths` (
  `id` int NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`) VALUES
(8, 'Acid Green', 1, '2024-07-10 12:21:26', NULL),
(9, 'Black', 1, '2024-07-10 12:21:33', NULL),
(10, 'Black And White', 1, '2024-07-10 12:21:40', NULL),
(11, 'Blue', 1, '2024-07-10 12:21:46', NULL),
(12, 'Blush Pink', 1, '2024-07-10 12:21:54', NULL),
(13, 'Brown', 1, '2024-07-10 12:22:04', NULL),
(14, 'Green', 1, '2024-07-10 12:22:10', NULL),
(15, 'Grey', 1, '2024-07-10 12:22:16', NULL),
(16, 'Maroon', 1, '2024-07-10 12:22:22', NULL),
(17, 'Multicolour', 1, '2024-07-10 12:22:29', NULL),
(18, 'Navy', 1, '2024-07-10 12:22:35', NULL),
(19, 'Orange', 1, '2024-07-10 12:22:42', NULL),
(20, 'Peach', 1, '2024-07-10 12:22:51', NULL),
(21, 'Pink', 1, '2024-07-10 12:22:58', NULL),
(22, 'Red', 1, '2024-07-10 12:23:03', NULL),
(23, 'Tint', 1, '2024-07-10 12:23:09', NULL),
(24, 'Vermilion', 1, '2024-07-10 12:23:15', NULL),
(25, 'Violet', 1, '2024-07-10 12:23:23', NULL),
(26, 'White', 1, '2024-07-10 12:23:33', NULL),
(27, 'Yellow', 1, '2024-07-10 12:23:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fabrics`
--

CREATE TABLE `fabrics` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fabrics`
--

INSERT INTO `fabrics` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`) VALUES
(4, 'Chiffon', 1, '2024-07-10 12:19:12', NULL),
(5, 'Cotton', 1, '2024-07-10 12:19:19', NULL),
(6, 'Denim', 1, '2024-07-10 12:19:26', NULL),
(7, 'Georgette', 1, '2024-07-10 12:19:33', NULL),
(8, 'Knit', 1, '2024-07-10 12:19:39', NULL),
(9, 'Linen', 1, '2024-07-10 12:19:46', NULL),
(10, 'Nylon', 1, '2024-07-10 12:19:53', NULL),
(11, 'Polyester', 1, '2024-07-10 12:20:06', NULL),
(12, 'Rayon', 1, '2024-07-10 12:20:13', NULL),
(13, 'Satin', 1, '2024-07-10 12:20:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parentFilters`
--

CREATE TABLE `parentFilters` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parentFilters`
--

INSERT INTO `parentFilters` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`) VALUES
(2, 'Category', 1, NULL, NULL),
(3, 'Color', 1, '2024-07-10 07:53:59', NULL),
(4, 'Fabric', 1, '2024-07-10 07:54:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parentMenus`
--

CREATE TABLE `parentMenus` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `parentMenus`
--

INSERT INTO `parentMenus` (`id`, `name`, `admin_id`, `createdAt`, `updatedAt`) VALUES
(2, 'sharma ji', 1, '2024-07-10 08:52:23', '2024-07-10 08:58:14'),
(3, 'cloths new ', 1, '2024-07-10 08:52:33', '2024-07-10 08:55:22'),
(4, 'Formals', 1, '2024-07-10 08:52:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productColors`
--

CREATE TABLE `productColors` (
  `id` int NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `color_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productColors`
--

INSERT INTO `productColors` (`id`, `admin_id`, `createdAt`, `updatedAt`, `product_id`, `color_id`) VALUES
(1, 1, NULL, NULL, 1, 8),
(2, 1, NULL, NULL, 1, 13),
(3, 1, NULL, NULL, 1, 10),
(4, 1, NULL, NULL, 1, 16),
(5, 1, NULL, NULL, 1, 13),
(6, 1, NULL, NULL, 2, 20),
(7, 1, NULL, NULL, 2, 21),
(8, 1, NULL, NULL, 2, 22),
(9, 1, NULL, NULL, 3, 18),
(10, 1, '2024-07-11 17:20:09', NULL, 4, 8),
(11, 1, '2024-07-11 17:20:09', NULL, 4, 10),
(12, 1, '2024-07-11 17:20:10', NULL, 4, 24),
(13, 1, '2024-07-11 17:47:23', NULL, 5, 23),
(14, 1, '2024-07-11 17:47:23', NULL, 5, 24),
(15, 1, '2024-07-11 17:47:23', NULL, 5, 25),
(16, 1, '2024-07-11 17:47:24', NULL, 5, 27);

-- --------------------------------------------------------

--
-- Table structure for table `productFabrics`
--

CREATE TABLE `productFabrics` (
  `id` int NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `fabric_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productFabrics`
--

INSERT INTO `productFabrics` (`id`, `admin_id`, `createdAt`, `updatedAt`, `product_id`, `fabric_id`) VALUES
(1, 1, NULL, NULL, 1, 4),
(2, 1, NULL, NULL, 1, 5),
(3, 1, NULL, NULL, 1, 6),
(4, 1, NULL, NULL, 1, 7),
(5, 1, NULL, NULL, 2, 8),
(6, 1, NULL, NULL, 2, 9),
(7, 1, NULL, NULL, 2, 10),
(8, 1, NULL, NULL, 3, 11),
(9, 1, NULL, NULL, 3, 12),
(10, 1, '2024-07-11 17:20:07', NULL, 4, 5),
(11, 1, '2024-07-11 17:20:08', NULL, 4, 11),
(12, 1, '2024-07-11 17:20:08', NULL, 4, 13),
(13, 1, '2024-07-11 17:47:22', NULL, 5, 4),
(14, 1, '2024-07-11 17:47:22', NULL, 5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `productImages`
--

CREATE TABLE `productImages` (
  `id` int NOT NULL,
  `url1` text NOT NULL,
  `url2` text NOT NULL,
  `url3` text NOT NULL,
  `url4` text NOT NULL,
  `url5` text NOT NULL,
  `admin_id` int NOT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productImages`
--

INSERT INTO `productImages` (`id`, `url1`, `url2`, `url3`, `url4`, `url5`, `admin_id`, `product_id`) VALUES
(1, 'https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FDR896ACBL_2.jpg%3Fv%3D1689061795&w=1200&q=75', 'url 2', 'url 3', 'url 4', 'url 5', 1, 1),
(2, 'https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2F3_c10ecf54-1853-446c-8a12-16bd3d7e1700.png%3Fv%3D1690454351&w=1920&q=75', 'url 2', 'url 2', 'url 2', 'url 2', 1, 2),
(3, 'https://www.fablestreet.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0486%2F0634%2F7416%2Ffiles%2FSK097BEGE_2.jpg%3Fv%3D1712125284&w=1200&q=75', 'url 3', 'url 3', 'url 3', 'url 3', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `sizeAndFit` text NOT NULL,
  `fabricAndCare` text NOT NULL,
  `isRecycleBin` tinyint(1) NOT NULL,
  `isPublished` tinyint(1) NOT NULL,
  `isFavorite` tinyint(1) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `productImages_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `sizeAndFit`, `fabricAndCare`, `isRecycleBin`, `isPublished`, `isFavorite`, `admin_id`, `createdAt`, `updatedAt`, `productImages_id`, `category_id`) VALUES
(1, 'T-shirts', 'description', 'sizeAndFit', 'fabricAndCare', 0, 1, 1, 1, NULL, NULL, 1, 5),
(2, 'Two -shirts ', 'description', 'sizeAndFit', 'fabricAndCare', 0, 1, 1, 1, NULL, NULL, 2, 5),
(3, 'Three -shirts ', 'description', 'sizeAndFit', 'fabricAndCare', 0, 1, 1, 1, NULL, NULL, 3, 5),
(4, 'SAMSUNG Galaxy F13 (Sunrise Copper, 64 GB)  (4 GB RAM)', '<p><strong>fa</strong></p><p><strong>fasfasfsfasdfa<u>sfasdfadsfsadfsadf</u></strong></p><p><strong><u>asdfasdfasdf</u></strong></p><p><strong>asdfasfadsfa</strong></p>', '<p><strong><u>Fabirc and ca</u>re <s>Details</s>&nbsp;</strong></p>', '<p><strong><u>Fabirc and ca</u>re <s>Details</s>&nbsp;</strong></p>', 0, 1, 1, 1, '2024-07-11 17:20:04', NULL, 1, 12),
(5, 'Placket Detail Waistcoat - Grey', '<p><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">- Comfort fit</span><br style=\"box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">- V-neck</span><br style=\"box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">- Extended placket detail</span><br style=\"box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">- Sleeveless</span><br style=\"box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">- Has A lining</span><br style=\"box-sizing: inherit; padding: 0px; margin: 0px; font-family: SourceSansLight; color: rgb(41, 40, 43); font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;\"><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">- Non-transparent</span></p>', '<p><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Fabric &amp; Care</span></p>', '<p><span style=\"color: rgb(41, 40, 43); font-family: SourceSansLight; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Fabric &amp; Care</span></p>', 0, 1, 1, 1, '2024-07-11 17:47:18', NULL, 2, 12);

-- --------------------------------------------------------

--
-- Table structure for table `productSizes`
--

CREATE TABLE `productSizes` (
  `id` int NOT NULL,
  `mrp` int NOT NULL,
  `discountPercent` int NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `PSize_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `productSizes`
--

INSERT INTO `productSizes` (`id`, `mrp`, `discountPercent`, `admin_id`, `createdAt`, `updatedAt`, `product_id`, `PSize_id`) VALUES
(1, 1000, 2, 1, NULL, NULL, 1, 1),
(2, 2000, 10, 1, NULL, NULL, 1, 2),
(3, 3000, 15, 1, NULL, NULL, 1, 3),
(4, 599, 20, 1, NULL, NULL, 1, 4),
(5, 200, 12, 1, NULL, NULL, 2, 5),
(6, 300, 16, 1, NULL, NULL, 2, 6),
(7, 899, 13, 1, NULL, NULL, 2, 7),
(8, 788, 14, 1, NULL, NULL, 2, 8),
(9, 4599, 21, 1, NULL, NULL, 3, 9),
(10, 2343, 25, 1, NULL, NULL, 3, 10),
(11, 4535, 23, 1, NULL, NULL, 3, NULL),
(12, 2646, 18, 1, NULL, NULL, 3, NULL),
(13, 100, 2, 1, '2024-07-11 17:20:05', NULL, 4, 11),
(14, 322323, 112, 1, '2024-07-11 17:20:06', NULL, 4, 12),
(15, 4343242, 22, 1, '2024-07-11 17:20:07', NULL, 4, 13),
(16, 1000, 12, 1, '2024-07-11 17:47:19', NULL, 5, 14),
(17, 2000, 23, 1, '2024-07-11 17:47:20', NULL, 5, 15),
(18, 1221, 23, 1, '2024-07-11 17:47:21', NULL, 5, 16),
(19, 43434, 86, 1, '2024-07-11 17:47:21', NULL, 5, 17);

-- --------------------------------------------------------

--
-- Table structure for table `pSizes`
--

CREATE TABLE `pSizes` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pSizes`
--

INSERT INTO `pSizes` (`id`, `name`, `qty`, `admin_id`, `createdAt`, `updatedAt`, `product_id`) VALUES
(1, 'X', 2, 1, NULL, NULL, 1),
(2, 'L', 30, 1, NULL, NULL, 1),
(3, 'M', 2, 1, NULL, NULL, 1),
(4, 'N', 43, 1, NULL, NULL, 1),
(5, '100', 2, 1, NULL, NULL, 2),
(6, '200', 30, 1, NULL, NULL, 2),
(7, '300', 2, 1, NULL, NULL, 2),
(8, '400', 43, 1, NULL, NULL, 2),
(9, '501', 2, 1, NULL, NULL, 3),
(10, '502', 30, 1, NULL, NULL, 3),
(11, 'XXL', 32, 1, '2024-07-11 17:20:04', NULL, 4),
(12, 'XLM', 43, 1, '2024-07-11 17:20:06', NULL, 4),
(13, 'XLMM', 21, 1, '2024-07-11 17:20:06', NULL, 4),
(14, 'A', 10, 1, '2024-07-11 17:47:19', NULL, 5),
(15, 'B', 3, 1, '2024-07-11 17:47:20', NULL, 5),
(16, 'C', 21, 1, '2024-07-11 17:47:21', NULL, 5),
(17, 'D', 211, 1, '2024-07-11 17:47:21', NULL, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminAuths`
--
ALTER TABLE `AdminAuths`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `childFilters`
--
ALTER TABLE `childFilters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `childMenus`
--
ALTER TABLE `childMenus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `clientAuths`
--
ALTER TABLE `clientAuths`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD UNIQUE KEY `email_62` (`email`),
  ADD UNIQUE KEY `email_63` (`email`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fabrics`
--
ALTER TABLE `fabrics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parentFilters`
--
ALTER TABLE `parentFilters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `parentMenus`
--
ALTER TABLE `parentMenus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productColors`
--
ALTER TABLE `productColors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`);

--
-- Indexes for table `productFabrics`
--
ALTER TABLE `productFabrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `fabric_id` (`fabric_id`);

--
-- Indexes for table `productImages`
--
ALTER TABLE `productImages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`),
  ADD UNIQUE KEY `name_4` (`name`),
  ADD UNIQUE KEY `name_5` (`name`),
  ADD UNIQUE KEY `name_6` (`name`),
  ADD UNIQUE KEY `name_7` (`name`),
  ADD UNIQUE KEY `name_8` (`name`),
  ADD UNIQUE KEY `name_9` (`name`),
  ADD UNIQUE KEY `name_10` (`name`),
  ADD UNIQUE KEY `name_11` (`name`),
  ADD UNIQUE KEY `name_12` (`name`),
  ADD UNIQUE KEY `name_13` (`name`),
  ADD UNIQUE KEY `name_14` (`name`),
  ADD UNIQUE KEY `name_15` (`name`),
  ADD UNIQUE KEY `name_16` (`name`),
  ADD UNIQUE KEY `name_17` (`name`),
  ADD UNIQUE KEY `name_18` (`name`),
  ADD UNIQUE KEY `name_19` (`name`),
  ADD UNIQUE KEY `name_20` (`name`),
  ADD UNIQUE KEY `name_21` (`name`),
  ADD UNIQUE KEY `name_22` (`name`),
  ADD UNIQUE KEY `name_23` (`name`),
  ADD UNIQUE KEY `name_24` (`name`),
  ADD UNIQUE KEY `name_25` (`name`),
  ADD UNIQUE KEY `name_26` (`name`),
  ADD UNIQUE KEY `name_27` (`name`),
  ADD UNIQUE KEY `name_28` (`name`),
  ADD UNIQUE KEY `name_29` (`name`),
  ADD UNIQUE KEY `name_30` (`name`),
  ADD UNIQUE KEY `name_31` (`name`),
  ADD UNIQUE KEY `name_32` (`name`),
  ADD UNIQUE KEY `name_33` (`name`),
  ADD UNIQUE KEY `name_34` (`name`),
  ADD UNIQUE KEY `name_35` (`name`),
  ADD UNIQUE KEY `name_36` (`name`),
  ADD UNIQUE KEY `name_37` (`name`),
  ADD UNIQUE KEY `name_38` (`name`),
  ADD UNIQUE KEY `name_39` (`name`),
  ADD KEY `productImages_id` (`productImages_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `productSizes`
--
ALTER TABLE `productSizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `PSize_id` (`PSize_id`);

--
-- Indexes for table `pSizes`
--
ALTER TABLE `pSizes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`),
  ADD UNIQUE KEY `name_3` (`name`),
  ADD UNIQUE KEY `name_4` (`name`),
  ADD UNIQUE KEY `name_5` (`name`),
  ADD UNIQUE KEY `name_6` (`name`),
  ADD UNIQUE KEY `name_7` (`name`),
  ADD UNIQUE KEY `name_8` (`name`),
  ADD UNIQUE KEY `name_9` (`name`),
  ADD UNIQUE KEY `name_10` (`name`),
  ADD UNIQUE KEY `name_11` (`name`),
  ADD UNIQUE KEY `name_12` (`name`),
  ADD UNIQUE KEY `name_13` (`name`),
  ADD UNIQUE KEY `name_14` (`name`),
  ADD UNIQUE KEY `name_15` (`name`),
  ADD UNIQUE KEY `name_16` (`name`),
  ADD UNIQUE KEY `name_17` (`name`),
  ADD UNIQUE KEY `name_18` (`name`),
  ADD UNIQUE KEY `name_19` (`name`),
  ADD UNIQUE KEY `name_20` (`name`),
  ADD UNIQUE KEY `name_21` (`name`),
  ADD UNIQUE KEY `name_22` (`name`),
  ADD UNIQUE KEY `name_23` (`name`),
  ADD UNIQUE KEY `name_24` (`name`),
  ADD UNIQUE KEY `name_25` (`name`),
  ADD UNIQUE KEY `name_26` (`name`),
  ADD UNIQUE KEY `name_27` (`name`),
  ADD UNIQUE KEY `name_28` (`name`),
  ADD UNIQUE KEY `name_29` (`name`),
  ADD UNIQUE KEY `name_30` (`name`),
  ADD UNIQUE KEY `name_31` (`name`),
  ADD UNIQUE KEY `name_32` (`name`),
  ADD UNIQUE KEY `name_33` (`name`),
  ADD UNIQUE KEY `name_34` (`name`),
  ADD UNIQUE KEY `name_35` (`name`),
  ADD UNIQUE KEY `name_36` (`name`),
  ADD UNIQUE KEY `name_37` (`name`),
  ADD UNIQUE KEY `name_38` (`name`),
  ADD UNIQUE KEY `name_39` (`name`),
  ADD UNIQUE KEY `name_40` (`name`),
  ADD UNIQUE KEY `name_41` (`name`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AdminAuths`
--
ALTER TABLE `AdminAuths`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `childFilters`
--
ALTER TABLE `childFilters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `childMenus`
--
ALTER TABLE `childMenus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `clientAuths`
--
ALTER TABLE `clientAuths`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `fabrics`
--
ALTER TABLE `fabrics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `parentFilters`
--
ALTER TABLE `parentFilters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parentMenus`
--
ALTER TABLE `parentMenus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productColors`
--
ALTER TABLE `productColors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `productFabrics`
--
ALTER TABLE `productFabrics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `productImages`
--
ALTER TABLE `productImages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `productSizes`
--
ALTER TABLE `productSizes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `pSizes`
--
ALTER TABLE `pSizes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `childFilters`
--
ALTER TABLE `childFilters`
  ADD CONSTRAINT `childFilters_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parentFilters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `childMenus`
--
ALTER TABLE `childMenus`
  ADD CONSTRAINT `childMenus_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `parentMenus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productColors`
--
ALTER TABLE `productColors`
  ADD CONSTRAINT `productColors_ibfk_67` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productColors_ibfk_68` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productFabrics`
--
ALTER TABLE `productFabrics`
  ADD CONSTRAINT `productFabrics_ibfk_27` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productFabrics_ibfk_28` FOREIGN KEY (`fabric_id`) REFERENCES `fabrics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productImages`
--
ALTER TABLE `productImages`
  ADD CONSTRAINT `productImages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_75` FOREIGN KEY (`productImages_id`) REFERENCES `productImages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_76` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productSizes`
--
ALTER TABLE `productSizes`
  ADD CONSTRAINT `productSizes_ibfk_27` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productSizes_ibfk_28` FOREIGN KEY (`PSize_id`) REFERENCES `pSizes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pSizes`
--
ALTER TABLE `pSizes`
  ADD CONSTRAINT `pSizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
