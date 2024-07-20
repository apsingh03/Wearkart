-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: bm1vynnmscycszuwhkzm-mysql.services.clever-cloud.com:3306
-- Generation Time: Jul 20, 2024 at 09:43 AM
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
(1, 'Admin Singh', 'admin@gmail.com', '$2b$10$Xqp68q9q35OdUh65mAez5.Ujav75/mEHEt7IJuWqgDpQg5UMRAK2C', '2024-07-17 13:51:50', NULL);

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
(1, 'Jeans', 1, 0, '2024-07-17 19:19:57', '2024-07-20 06:41:06'),
(2, 'T-Shirt', 1, 0, '2024-07-17 14:13:10', NULL),
(3, 'Shirts', 1, 0, '2024-07-17 14:13:22', NULL),
(4, 'Crop Top', 1, 0, '2024-07-17 14:16:16', NULL),
(5, 'Lower', 1, 0, '2024-07-17 14:16:28', NULL);

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

--
-- Dumping data for table `clientAuths`
--

INSERT INTO `clientAuths` (`id`, `fullName`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'loreum Singh', 'user@gmail.com', '$2b$10$8/ox3ywFRicCx7E4McTLHOteywkRT5mb2azntjPtL3Ds97OgH513K', '2024-07-17 14:43:35', NULL),
(2, 'uday pratap singh', 'uday@gmail.com', 'uday singh', '2024-07-17 14:43:35', NULL);

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
(1, 'Red', 1, '2024-07-17 14:16:57', NULL),
(2, 'Orange', 1, '2024-07-17 14:17:05', NULL),
(3, 'Brown', 1, '2024-07-17 14:17:11', NULL),
(4, 'Yellow', 1, '2024-07-17 14:17:21', NULL),
(5, 'Green', 1, '2024-07-17 14:17:35', NULL),
(6, 'Turquoise', 1, '2024-07-17 14:17:41', NULL),
(7, 'Blue', 1, '2024-07-17 14:17:47', NULL),
(8, 'Violet', 1, '2024-07-17 14:18:32', NULL),
(9, 'Pink', 1, '2024-07-17 14:18:37', NULL),
(10, 'White', 1, '2024-07-17 14:18:42', NULL),
(11, 'Gray', 1, '2024-07-17 14:18:46', NULL),
(12, 'Black', 1, '2024-07-17 14:18:53', NULL);

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
(1, 'Cotton', 1, '2024-07-17 14:19:16', NULL),
(2, 'Polyster', 1, '2024-07-17 14:19:23', NULL),
(3, 'Nylon', 1, '2024-07-17 14:19:28', NULL),
(4, 'Woolean', 1, '2024-07-17 14:19:35', NULL);

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
(1, 1, '2024-07-17 14:23:02', NULL, 1, 2),
(2, 1, '2024-07-17 14:23:03', NULL, 1, 3),
(3, 1, '2024-07-17 14:23:03', NULL, 1, 5),
(4, 1, '2024-07-17 15:15:11', NULL, 2, 9),
(5, 1, '2024-07-17 15:15:12', NULL, 2, 10),
(6, 1, '2024-07-17 15:15:13', NULL, 2, 11),
(7, 1, '2024-07-17 15:15:13', NULL, 2, 12);

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
(1, 1, '2024-07-17 14:23:02', NULL, 1, 2),
(2, 1, '2024-07-17 14:23:02', NULL, 1, 3),
(3, 1, '2024-07-17 15:15:10', NULL, 2, 1),
(4, 1, '2024-07-17 15:15:11', NULL, 2, 2);

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
(1, 'https://clothingecommerce.s3.amazonaws.com/1721226171256-j4evt8bojr.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226173771-407e8yizays.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226174868-lfcewdy537.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226175912-d5ox6gn6zig.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721226176850-our5s2k567f.jpg', 1, 1),
(2, 'https://clothingecommerce.s3.amazonaws.com/1721229296773-ukolpssbvn.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229299022-fx26enwutvo.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229300164-na5rdfj8nzg.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229301011-gfsjys5n9q7.jpg', 'https://clothingecommerce.s3.amazonaws.com/1721229301884-1q0b0g74p3p.jpg', 1, 2);

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
  `isFavorite` tinyint(1) NOT NULL,
  `isPublished` tinyint(1) NOT NULL,
  `admin_id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `productImages_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `sizeAndFit`, `fabricAndCare`, `isRecycleBin`, `isFavorite`, `isPublished`, `admin_id`, `createdAt`, `updatedAt`, `productImages_id`, `category_id`) VALUES
(1, 'Boat Neck Geometric Print Top - Red', '<p>df</p><ul><li>sdfsdafsadf</li></ul><p>sdfa<strong>This is a new</strong> Data&nbsp;</p><p>asd</p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', '<p><span style=\"color: rgb(33, 37, 41); font-family: system-ui, -apple-system, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, &quot;Noto Sans&quot;, &quot;Liberation Sans&quot;, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline !important; font-size: 16px;\">Fabric <strong>and</strong> Care <strong>Details</strong></span></p>', 0, 0, 1, 1, '2024-07-17 14:22:59', NULL, 1, 3),
(2, 'Satin Geometric Print Shirt - Navy', '<ul><li>Comfort Fit </li><li>Geomatric Pant</li><li>Stylish buttons</li><br></ul>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', '<ol><li>Its a <strong>pure</strong> cotton Work Shirt</li><li>also contains some kind of polySter</li><br></ol>', 0, 0, 1, 1, '2024-07-17 15:15:05', NULL, 2, 2);

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
(1, 1200, 10, 1, '2024-07-17 14:23:00', NULL, 1, 1),
(2, 1400, 15, 1, '2024-07-17 14:23:01', NULL, 1, 2),
(3, 1600, 8, 1, '2024-07-17 14:23:01', NULL, 1, 3),
(4, 4323, 22, 1, '2024-07-17 14:23:01', NULL, 1, 4),
(5, 323, 21, 1, '2024-07-17 15:15:07', NULL, 2, 5),
(6, 2112, 10, 1, '2024-07-17 15:15:08', NULL, 2, 6),
(7, 2124, 4, 1, '2024-07-17 15:15:09', NULL, 2, 7),
(8, 5432, 20, 1, '2024-07-17 15:15:09', NULL, 2, 8),
(9, 1212, 22, 1, '2024-07-17 15:15:10', NULL, 2, 9);

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
(1, 'A', 10, 1, '2024-07-17 14:23:00', NULL, 1),
(2, 'AA', 20, 1, '2024-07-17 14:23:00', NULL, 1),
(3, 'AAA', 29, 1, '2024-07-17 14:23:01', NULL, 1),
(4, 'AAAA', 39, 1, '2024-07-17 14:23:01', NULL, 1),
(5, 'B', 15, 1, '2024-07-17 15:15:06', NULL, 2),
(6, 'BB', 30, 1, '2024-07-17 15:15:08', NULL, 2),
(7, 'BBB', 10, 1, '2024-07-17 15:15:08', NULL, 2),
(8, 'BBBB', 13, 1, '2024-07-17 15:15:09', NULL, 2),
(9, 'BBBBB', 10, 1, '2024-07-17 15:15:10', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `userAddresses`
--

CREATE TABLE `userAddresses` (
  `id` int NOT NULL,
  `receiverName` varchar(255) NOT NULL,
  `fullAddress` varchar(255) NOT NULL,
  `landmark` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userCartItems`
--

CREATE TABLE `userCartItems` (
  `id` int NOT NULL,
  `qty` int DEFAULT NULL,
  `color_id` int DEFAULT NULL,
  `PSize_id` int DEFAULT NULL,
  `orderPlacedStatus` tinyint(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `cart_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userCartItems`
--

INSERT INTO `userCartItems` (`id`, `qty`, `color_id`, `PSize_id`, `orderPlacedStatus`, `createdAt`, `updatedAt`, `cart_id`, `user_id`, `product_id`) VALUES
(1, 12, 5, 2, 1, '2024-07-17 14:45:05', NULL, 1, 1, 1),
(2, 6, 9, 9, 1, '2024-07-17 15:16:43', NULL, 1, 1, 2),
(5, 2, 9, 8, 1, '2024-07-19 13:41:42', NULL, 3, 1, 2),
(6, 1, 5, 4, 1, '2024-07-20 09:24:06', NULL, 4, 1, 1),
(7, 5, 9, 5, 1, '2024-07-20 09:27:26', NULL, 5, 1, 2),
(8, 1, 3, 3, 1, '2024-07-20 09:30:14', NULL, 6, 1, 1),
(9, 1, 11, 8, 1, '2024-07-20 09:30:30', NULL, 6, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `userCarts`
--

CREATE TABLE `userCarts` (
  `id` int NOT NULL,
  `cartAmount` int DEFAULT NULL,
  `paymentMode` varchar(255) DEFAULT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `deliveryStatus` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `address_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userCarts`
--

INSERT INTO `userCarts` (`id`, `cartAmount`, `paymentMode`, `orderId`, `paymentId`, `status`, `deliveryStatus`, `createdAt`, `updatedAt`, `user_id`, `address_id`) VALUES
(1, 19952, 'Online', 'order_OaPvRmaNLCIfdN', 'pay_OaPvoZeyGFy0Ga', 'SUCCESSFUL', 'Order Packed', '2024-07-17 14:45:05', '2024-07-20 08:51:32', 1, NULL),
(3, 8691, 'Online', 'order_OaVkNkd07grrDO', 'pay_OaVkkqaHpgJetF', 'SUCCESSFUL', 'Order Dispatched', '2024-07-19 13:41:41', '2024-07-20 08:51:45', 1, NULL),
(4, 3371, 'Online', 'order_OaptHkWExWuYlo', 'pay_Oapu2WZgk2kDwL', 'SUCCESSFUL', NULL, '2024-07-20 09:24:06', NULL, 1, NULL),
(5, 1275, 'Online', 'order_OapxNG08KcFlbT', 'pay_OapxpPZVNvEnGw', 'SUCCESSFUL', NULL, '2024-07-20 09:27:25', NULL, 1, NULL),
(6, 5817, 'Online', 'order_Oaq0G6OPtPROnv', 'pay_Oaq0PBtn5vWedO', 'SUCCESSFUL', NULL, '2024-07-20 09:30:14', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userFavoriteProducts`
--

CREATE TABLE `userFavoriteProducts` (
  `id` int NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminAuths`
--
ALTER TABLE `AdminAuths`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

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
  ADD UNIQUE KEY `email_2` (`email`);

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
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `userAddresses`
--
ALTER TABLE `userAddresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userCartItems`
--
ALTER TABLE `userCartItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `userCarts`
--
ALTER TABLE `userCarts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `userFavoriteProducts`
--
ALTER TABLE `userFavoriteProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `childFilters`
--
ALTER TABLE `childFilters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `childMenus`
--
ALTER TABLE `childMenus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clientAuths`
--
ALTER TABLE `clientAuths`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `fabrics`
--
ALTER TABLE `fabrics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `parentFilters`
--
ALTER TABLE `parentFilters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `parentMenus`
--
ALTER TABLE `parentMenus`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productColors`
--
ALTER TABLE `productColors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `productFabrics`
--
ALTER TABLE `productFabrics`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productImages`
--
ALTER TABLE `productImages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productSizes`
--
ALTER TABLE `productSizes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pSizes`
--
ALTER TABLE `pSizes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `userAddresses`
--
ALTER TABLE `userAddresses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userCartItems`
--
ALTER TABLE `userCartItems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `userCarts`
--
ALTER TABLE `userCarts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `userFavoriteProducts`
--
ALTER TABLE `userFavoriteProducts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

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
  ADD CONSTRAINT `productColors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productColors_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productFabrics`
--
ALTER TABLE `productFabrics`
  ADD CONSTRAINT `productFabrics_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productFabrics_ibfk_2` FOREIGN KEY (`fabric_id`) REFERENCES `fabrics` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productImages`
--
ALTER TABLE `productImages`
  ADD CONSTRAINT `productImages_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productImages_id`) REFERENCES `productImages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productSizes`
--
ALTER TABLE `productSizes`
  ADD CONSTRAINT `productSizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `productSizes_ibfk_2` FOREIGN KEY (`PSize_id`) REFERENCES `pSizes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `pSizes`
--
ALTER TABLE `pSizes`
  ADD CONSTRAINT `pSizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userAddresses`
--
ALTER TABLE `userAddresses`
  ADD CONSTRAINT `userAddresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userCartItems`
--
ALTER TABLE `userCartItems`
  ADD CONSTRAINT `userCartItems_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `userCarts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userCartItems_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userCartItems_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userCarts`
--
ALTER TABLE `userCarts`
  ADD CONSTRAINT `userCarts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userCarts_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `userAddresses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userFavoriteProducts`
--
ALTER TABLE `userFavoriteProducts`
  ADD CONSTRAINT `userFavoriteProducts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `clientAuths` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `userFavoriteProducts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
