-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Jul 21, 2026 at 03:22 PM
-- Server version: 8.0.46
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sala_ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content_json` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `campaigns`
--

INSERT INTO `campaigns` (`id`, `slug`, `title`, `content_json`) VALUES
(1, 'spring-lookbook', 'Spring Lookbook', '{\"images\": [\"https://image.msscdn.net/thumbnails/global_images/goods_img/20250819/5335185/5335185_17585043408372_big.jpg\", \"https://img.shoplineapp.com/media/image_clips/6908d482fa93bd00144f634a/original.jpeg?1762186369=&owner_id=57ff39d96170695338f65200\", \"https://image.msscdn.net/images/goods_img/20250819/5335153/5335153_17585088810345_500.jpg\", \"https://preview.redd.it/231120-winter-for-polo-ralph-lauren-v0-v3oro4ftre1c1.jpg?width=640&crop=smart&auto=webp&s=eca3091107c798f86fa9439f2412ab634e95c7e4\", \"https://pbs.twimg.com/media/G_4hhThW4AAob3q.jpg\", \"https://www.fashionchingu.com/wp-content/uploads/2024/04/Black-Double-Layers-Pleated-Skirt-Winter-Aespa-Idol-1-500x685.jpg\", \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh2BztG-llbah2Woxke1HMGpd9Aaseyzw4wQGmdHww3-EBW8vcbZ9kzPA&s=10\", \"https://pbs.twimg.com/media/HGFRo0LXkAAw05g.jpg\", \"https://pbs.twimg.com/media/HL4ImN7aIAAj88s.jpg\", \"https://valiram247.com/cdn/shop/files/C2971FBCCB3D4E2DB053D3A1C54CE725.jpg?v=1755830996\", \"https://files.vogue.co.th/uploads/Karina_X_MLB_(13).webp\", \"https://pbs.twimg.com/media/GqZOLiEXwAAA4cK.jpg\"]}'),
(2, 'in-her-own-language', 'IN HER OWN LANGUAGE', '{\"list\": [\"1. WINTER - Kim Minjeong\", \"2. KARINA - Yoo Jimin\", \"3. GISELLE - Uchinaga Aeri\", \"4. NINGNING - Ning Yizhuo\"], \"hero_image\": \"https://f.ptcdn.info/315/084/000/lwreqf75iX3B2T26hbm-s.jpg\", \"paragraphs\": [\"SALA continues the exploration of its Spring/Summer 2026 collection, “A Dialogue with Oneself,” which invites women to reflect on their identity, thoughts, and inner conversations, through its latest fashion campaign, “In Her Own Language”. The campaign celebrates the many dimensions of womanhood through a more profound and nuanced perspective.\", \"In this campaign, SALA moves beyond conventional definitions by proposing that women do not simply use language to communicate with the world. The woman herself is the language, a language reflected through her way of life, mindset, experiences, as well as the inspiration and values she passes on to society. For SALA, clothing is not merely something women wear, but one of the languages they use to express who they are.\", \"The campaign conveys this concept through the stories of women from diverse industries, each interpreting her own language through pieces from the Spring/Summer 2026 collection. Each woman reflects her perspective on life, experiences, and role in the world through her own distinctive style. The campaign features inspiring women from 4 industries:\"], \"grid_images\": [\"https://preview.redd.it/231120-winter-for-polo-ralph-lauren-v0-v3oro4ftre1c1.jpg?width=640&crop=smart&auto=webp&s=eca3091107c798f86fa9439f2412ab634e95c7e4\", \"https://f.ptcdn.info/182/083/000/s8kf5b1d6xpDqfkoOYi9K-o.jpg\", \"https://www.pusspussmagazine.com/wp-content/uploads/2025/02/image00003-1440x2016.jpg\", \"https://img.shoplineapp.com/media/image_clips/6908d482fa93bd00144f634a/original.jpeg?1762186369=&owner_id=57ff39d96170695338f65200\"]}');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `cart_id` int NOT NULL,
  `user_id` int NOT NULL,
  `variant_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_slug` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_slug`) VALUES
(1, 'New Arrivals', 'new-arrivals'),
(3, 'เสื้อหมาเด็ก', 'puppet-shirt'),
(5, 'เสื้อหมาเแมว', 'puppet-cat-shirt');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) NOT NULL COMMENT 'เก็บอีเมลผู้รับ',
  `first_name` varchar(100) NOT NULL COMMENT 'ชื่อจริงผู้รับ',
  `last_name` varchar(100) NOT NULL COMMENT 'นามสกุลผู้รับ',
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL COMMENT 'ที่อยู่บ้านเลขที่ ถนน ซอย',
  `city` varchar(100) NOT NULL COMMENT 'อำเภอ/เขต/เมือง',
  `state` varchar(100) NOT NULL COMMENT 'จังหวัด/รัฐ',
  `postcode` varchar(10) NOT NULL COMMENT 'รหัสไปรษณีย์',
  `country` varchar(100) NOT NULL COMMENT 'ประเทศ',
  `subtotal` decimal(10,2) NOT NULL COMMENT 'ยอดรวมสินค้าก่อนคิดค่าส่ง (เช่น 480.00)',
  `shipping_free` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT 'ค่าจัดส่ง (กำหนด Default เป็น 0.00 ไว้ก่อนได้)',
  `payment_method` varchar(50) NOT NULL COMMENT 'เก็บประเภทการจ่ายเงิน',
  `payment_slip` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_price`, `status`, `created_at`, `email`, `first_name`, `last_name`, `phone`, `address`, `city`, `state`, `postcode`, `country`, `subtotal`, `shipping_free`, `payment_method`, `payment_slip`) VALUES
(8, 1, 700.00, 'pending', '2026-07-19 17:48:25', 'pataraporn142548@gmail.com', 'Pattarapond', 'Saelee', '0652939090', '11120', 'pak kret', 'nonthaburi', '11120', 'THAILAND', 700.00, 0.00, 'PROMPTPAY', '/uploads/payment-slips/1784483305482-74416120.jpg'),
(9, 1, 540.00, 'completed', '2026-07-19 17:49:11', 'pataraporn142548@gmail.com', 'Pattarapond', 'Saelee', '0652939090', '11120', 'pak kret', 'nonthaburi', '11120', 'THAILAND', 540.00, 0.00, 'PROMPTPAY', '/uploads/payment-slips/1784483351049-494322149.jpg'),
(10, 1, 390.00, 'cancelled', '2026-07-20 16:58:30', 'pataraporn142548@gmail.com', 'Pattarapond', 'Saelee', '0652939090', '11120', 'pak kret', 'nonthaburi', '11120', 'THAILAND', 390.00, 0.00, 'PROMPTPAY', '/uploads/payment-slips/1784566710211-481212927.jpg'),
(11, 1, 560.00, 'refunded', '2026-07-20 16:59:31', 'pataraporn142548@gmail.com', 'Pattarapond', 'Saelee', '0652939090', '11120', 'pak kret', 'nonthaburi', '11120', 'THAILAND', 560.00, 0.00, 'PROMPTPAY', '/uploads/payment-slips/1784566771950-360287860.jpg'),
(12, 1, 355.00, 'pending', '2026-07-20 17:17:58', 'pataraporn142548@gmail.com', 'Pattarapond', 'Saelee', '0652939090', '11120', 'pak kret', 'TH-10', '11120', 'THAILAND', 355.00, 0.00, 'PROMPTPAY', '/uploads/payment-slips/1784567878855-127566341.jpg'),
(13, 1, 390.00, 'cancelled', '2026-07-20 17:18:36', 'pataraporn142548@gmail.com', 'Pattarapond', 'Saelee', '0652939090', '11120', 'pak kret', 'nonthaburi', '11120', 'THAILAND', 390.00, 0.00, 'CREDIT_CARD', '/uploads/payment-slips/1784567916532-872208791.png');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `item_id` int NOT NULL,
  `order_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`item_id`, `order_id`, `variant_id`, `quantity`, `price`) VALUES
(9, 8, 5, 1, 700.00),
(10, 9, 23, 1, 540.00),
(11, 10, 50, 1, 390.00),
(12, 11, 53, 1, 560.00),
(13, 12, 62, 1, 355.00),
(14, 13, 50, 1, 390.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int NOT NULL,
  `category_id` int DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `base_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `name`, `description`, `base_price`, `created_at`) VALUES
(1, 1, 'SALA Good Baby Blue Plaid Coat', 'SALA Good Baby Blue Plaid Coat', 700.00, '2026-07-17 14:21:57'),
(2, 1, 'SALA Cloudknit Beret Set', 'SALA Cloudknit Beret Set', 430.00, '2026-07-17 14:21:57'),
(3, 1, 'SALA Sunday Polo Shirt', 'SALA Sunday Polo Shirt', 310.00, '2026-07-17 14:21:57'),
(4, 1, 'SALA Midnight Draped Slip Dress', 'SALA Midnight Draped Slip Dress', 620.00, '2026-07-17 14:21:57'),
(5, 1, 'SALA Tailored Blazer & Denim Set', 'SALA Tailored Blazer & Denim Set', 540.00, '2026-07-17 14:21:57'),
(6, 1, 'SALA Knit Beret Two-Piece', 'SALA Knit Beret Two-Piece', 470.00, '2026-07-17 14:21:57'),
(7, 1, 'SALA Plaid Wool-Blend Twill Shirt Jacket', 'SALA Plaid Wool-Blend Twill Shirt Jacket', 480.00, '2026-07-17 14:21:57'),
(8, 1, 'SALA WINTERFELL SWEATER', 'SALA WINTERFELL SWEATER', 400.00, '2026-07-17 14:21:57'),
(9, 1, 'SALA PINKSUMMER POLO SHIRT', 'SALA PINKSUMMER POLO SHIRT', 390.00, '2026-07-17 14:21:57'),
(10, 1, 'SALA Rainy Night Double-Breasted Coat', 'SALA Rainy Night Double-Breasted Coat', 560.00, '2026-07-17 14:21:57'),
(11, 1, 'SALA Oatmeal Cable Knit Cardigan', 'SALA Oatmeal Cable Knit Cardigan', 355.00, '2026-07-17 14:21:57'),
(12, 1, 'SALA Girls Don\'t Cry Dress', 'SALA Girls Don\'t Cry Dress', 900.00, '2026-07-17 14:21:57'),
(13, 1, 'SALA Camel Wrap Trench Coat', 'SALA Camel Wrap Trench Coat', 680.00, '2026-07-17 14:21:57'),
(14, 1, 'SALA Cropped Straight Jeans', 'SALA Cropped Straight Jeans', 290.00, '2026-07-17 14:21:57'),
(15, 1, 'SALA Satin Slip Cami Top', 'SALA Satin Slip Cami Top', 220.00, '2026-07-17 14:21:57'),
(16, 1, 'SALA Blush Ruffle Polo Shirt', 'SALA Blush Ruffle Polo Shirt', 390.00, '2026-07-17 14:21:57'),
(17, 1, 'SALA Charcoal Wool Overshirt', 'SALA Charcoal Wool Overshirt', 510.00, '2026-07-17 14:21:57'),
(18, 1, 'SALA Ivory Knit Beret Set', 'SALA Ivory Knit Beret Set', 400.00, '2026-07-17 14:21:57');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `image_id` int NOT NULL,
  `product_id` int NOT NULL,
  `variant_id` int DEFAULT NULL,
  `img_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`image_id`, `product_id`, `variant_id`, `img_url`, `is_primary`) VALUES
(1, 1, NULL, 'https://files.vogue.co.th/uploads/IMG_2736.webp', 1),
(2, 2, NULL, 'https://files.vogue.co.th/uploads/IMG_2737.webp', 1),
(3, 3, NULL, 'https://pbs.twimg.com/media/HMsX-54WMAAV_tz.jpg', 1),
(4, 4, NULL, 'https://img-highend.okezone.com/library/2023/11/21/master_winter_polo_ralph_lauren_2_Yqk5w9izpr.jpeg', 1),
(5, 5, NULL, 'https://pbs.twimg.com/media/HLiufV_XMAIW5Sl.jpg', 1),
(6, 6, NULL, 'https://www.pusspussmagazine.com/wp-content/uploads/2025/02/image00003.jpg', 1),
(7, 7, NULL, 'https://pub-dc9a9c6ac2a64ba48bce426ced0ac56a.r2.dev/kpics/2026/06/1782266930254-7actx5-0.jpg', 1),
(8, 8, NULL, 'https://pbs.twimg.com/media/HLiufV9WcAEmuxW.jpg', 1),
(9, 9, NULL, 'https://i.pinimg.com/736x/9f/c5/c9/9fc5c996e0aefdadeaad110d1fe6738f.jpg', 1),
(10, 10, NULL, 'https://pbs.twimg.com/media/GxfjzmQXIAAy6Iq.jpg', 1),
(11, 11, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1cg45kslHsM1PBiJ0VLD3YdA2OiY66DOBwLre0RZeyAfMnAJvUEPXwM&s=10', 1),
(12, 12, NULL, 'https://image-cdn.hypb.st/https%3A%2F%2Fbae.hypebeast.com%2Ffiles%2F2025%2F07%2F10%2FHNxSST_Campaign_Image_NoLogo_1080x1350_2-e1752163267982.jpg?q=90&w=800&cbr=1&fit=max', 1),
(13, 13, NULL, 'https://www.acfc.com.vn/acfc_wp/wp-content/uploads/2023/11/PRL-Winter-3-copy-819x1024.jpg', 1),
(14, 14, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNUd2Z_aVbYVGK3L-_kh-G6Lap61VtOrjD6NXurd6xWYWKaJNuivjipbIP&s=10', 1),
(15, 15, NULL, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSku4dx7I7MCMsLhnjqUA3CmV_dxrQDGvld4q-UJI8g197gX1MhNOF6DXaN&s=10', 1),
(16, 16, NULL, 'https://media.thecoolhour.com/wp-content/uploads/2026/07/15091551/aespas-winter-gives-wimbledon-tailoring-a-preppy-update-2.webp', 1),
(17, 17, NULL, 'https://pbs.twimg.com/media/HEuFTCcbsAAGr0A.jpg', 1),
(18, 18, NULL, 'https://bunny-wp-pullzone-fwyeoqiqu8.b-cdn.net/wp-content/uploads/2025/03/winter-2.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

CREATE TABLE `product_variants` (
  `variant_id` int NOT NULL,
  `product_id` int NOT NULL,
  `color` varchar(50) NOT NULL,
  `size` varchar(20) NOT NULL,
  `code` varchar(100) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`variant_id`, `product_id`, `color`, `size`, `code`, `stock_quantity`) VALUES
(3, 1, '#FFFFFF', 'XS', 'SALA-1-2C3E50-XS', 9),
(4, 1, '#FFFFFF', 'S', 'SALA-1-2C3E50-S', 8),
(5, 1, '#FFFFFF', 'M', 'SALA-1-2C3E50-M', 9),
(6, 1, '#FFFFFF', 'L', 'SALA-1-2C3E50-L', 2),
(7, 2, '#FDD741', 'XS', 'SALA-2-EFE3D0-XS', 10),
(8, 2, '#FDD741', 'S', 'SALA-2-EFE3D0-S', 10),
(9, 2, '#FDD741', 'M', 'SALA-2-EFE3D0-M', 9),
(10, 2, '#FDD741', 'L', 'SALA-2-EFE3D0-L', 10),
(11, 2, '#1C2833', 'XS', 'SALA-2-8B5A2B-XS', 10),
(12, 2, '#1C2833', 'S', 'SALA-2-8B5A2B-S', 10),
(13, 2, '#1C2833', 'M', 'SALA-2-8B5A2B-M', 10),
(14, 2, '#1C2833', 'L', 'SALA-2-8B5A2B-L', 10),
(15, 3, '#F2C9C9', 'XS', 'SALA-3-F2C9C9-XS', 10),
(16, 3, '#F2C9C9', 'S', 'SALA-3-F2C9C9-S', 10),
(17, 3, '#F2C9C9', 'M', 'SALA-3-F2C9C9-M', 10),
(18, 3, '#F2C9C9', 'L', 'SALA-3-F2C9C9-L', 9),
(19, 4, '#5b312a', 'XS', 'SALA-4-1C2833-XS', 10),
(20, 4, '#5b312a', 'S', 'SALA-4-1C2833-S', 10),
(21, 4, '#5b312a', 'M', 'SALA-4-1C2833-M', 10),
(22, 4, '#5b312a', 'L', 'SALA-4-1C2833-L', 10),
(23, 5, '#81876b', 'XS', 'SALA-5-0B1220-XS', 9),
(28, 5, '#81876b', 'S', 'SALA-5-3B4A63-S', 10),
(29, 5, '#81876b', 'M', 'SALA-5-3B4A63-M', 10),
(30, 5, '#81876b', 'L', 'SALA-5-3B4A63-L', 10),
(31, 6, '#D2691E', 'XS', 'SALA-6-D9CBB8-XS', 10),
(32, 6, '#D2691E', 'S', 'SALA-6-D9CBB8-S', 10),
(33, 6, '#D2691E', 'M', 'SALA-6-D9CBB8-M', 10),
(34, 6, '#D2691E', 'L', 'SALA-6-D9CBB8-L', 10),
(35, 7, '#efdecd', 'XS', 'SALA-7-8B5A2B-XS', 10),
(36, 7, '#efdecd', 'S', 'SALA-7-8B5A2B-S', 10),
(37, 7, '#efdecd', 'M', 'SALA-7-8B5A2B-M', 10),
(38, 7, '#efdecd', 'L', 'SALA-7-8B5A2B-L', 10),
(43, 8, '#856562', 'XS', 'SALA-8-1C2833-XS', 10),
(44, 8, '#856562', 'S', 'SALA-8-1C2833-S', 10),
(45, 8, '#856562', 'M', 'SALA-8-1C2833-M', 10),
(46, 8, '#856562', 'L', 'SALA-8-1C2833-L', 10),
(47, 9, '#7d2332', 'XS', 'SALA-9-F2C9C9-XS', 10),
(48, 9, '#7d2332', 'S', 'SALA-9-F2C9C9-S', 10),
(49, 9, '#7d2332', 'M', 'SALA-9-F2C9C9-M', 10),
(50, 9, '#7d2332', 'L', 'SALA-9-F2C9C9-L', 8),
(51, 10, '#575397', 'XS', 'SALA-10-A07855-XS', 10),
(52, 10, '#575397', 'S', 'SALA-10-A07855-S', 10),
(53, 10, '#575397', 'M', 'SALA-10-A07855-M', 9),
(54, 10, '#575397', 'L', 'SALA-10-A07855-L', 10),
(55, 11, '#eeeceb', 'XS', 'SALA-11-D9CBB8-XS', 10),
(56, 11, '#eeeceb', 'S', 'SALA-11-D9CBB8-S', 10),
(57, 11, '#eeeceb', 'M', 'SALA-11-D9CBB8-M', 10),
(58, 11, '#eeeceb', 'L', 'SALA-11-D9CBB8-L', 10),
(59, 11, '#16140e', 'XS', 'SALA-11-3B3B3B-XS', 10),
(60, 11, '#16140e', 'S', 'SALA-11-3B3B3B-S', 10),
(61, 11, '#16140e', 'M', 'SALA-11-3B3B3B-M', 10),
(62, 11, '#16140e', 'L', 'SALA-11-3B3B3B-L', 9),
(63, 12, '#b9dffc', 'XS', 'SALA-12-000000-XS', 10),
(64, 12, '#b9dffc', 'S', 'SALA-12-000000-S', 10),
(65, 12, '#b9dffc', 'M', 'SALA-12-000000-M', 10),
(66, 12, '#b9dffc', 'L', 'SALA-12-000000-L', 10),
(67, 13, '#9e2130', 'XS', 'SALA-13-C19A6B-XS', 10),
(68, 13, '#9e2130', 'S', 'SALA-13-C19A6B-S', 10),
(69, 13, '#9e2130', 'M', 'SALA-13-C19A6B-M', 10),
(70, 13, '#9e2130', 'L', 'SALA-13-C19A6B-L', 10),
(71, 14, '#dfdfde', 'XS', 'SALA-14-3B4A63-XS', 10),
(72, 14, '#dfdfde', 'S', 'SALA-14-3B4A63-S', 10),
(73, 14, '#dfdfde', 'M', 'SALA-14-3B4A63-M', 10),
(74, 14, '#dfdfde', 'L', 'SALA-14-3B4A63-L', 10),
(75, 15, '#c61c19', 'XS', 'SALA-15-8B5A2B-XS', 10),
(76, 15, '#c61c19', 'S', 'SALA-15-8B5A2B-S', 10),
(77, 15, '#c61c19', 'M', 'SALA-15-8B5A2B-M', 10),
(78, 15, '#c61c19', 'L', 'SALA-15-8B5A2B-L', 10),
(83, 16, '#ded5cc', 'XS', 'SALA-16-F2C9C9-XS', 10),
(84, 16, '#ded5cc', 'S', 'SALA-16-F2C9C9-S', 10),
(85, 16, '#ded5cc', 'M', 'SALA-16-F2C9C9-M', 10),
(86, 16, '#ded5cc', 'L', 'SALA-16-F2C9C9-L', 10),
(87, 17, '#07449f', 'XS', 'SALA-17-2C3E50-XS', 10),
(88, 17, '#07449f', 'S', 'SALA-17-2C3E50-S', 10),
(89, 17, '#07449f', 'M', 'SALA-17-2C3E50-M', 10),
(90, 17, '#07449f', 'L', 'SALA-17-2C3E50-L', 10),
(91, 17, '#cde1f0', 'XS', 'SALA-17-000000-XS', 10),
(92, 17, '#cde1f0', 'S', 'SALA-17-000000-S', 10),
(93, 17, '#cde1f0', 'M', 'SALA-17-000000-M', 10),
(94, 17, '#cde1f0', 'L', 'SALA-17-000000-L', 10),
(95, 18, '#e7da8e', 'XS', 'SALA-18-F5E6D3-XS', 10),
(96, 18, '#e7da8e', 'S', 'SALA-18-F5E6D3-S', 10),
(97, 18, '#e7da8e', 'M', 'SALA-18-F5E6D3-M', 10),
(98, 18, '#e7da8e', 'L', 'SALA-18-F5E6D3-L', 10);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role_name`) VALUES
(2, 'admin'),
(1, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(20) NOT NULL,
  `role_id` int DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `birthdate` date DEFAULT NULL,
  `country_region` varchar(100) DEFAULT NULL,
  `house_number_street` varchar(255) DEFAULT NULL,
  `apartment_suite_unit` varchar(100) DEFAULT NULL,
  `town_city` varchar(100) DEFAULT NULL,
  `state_province` varchar(100) DEFAULT NULL,
  `postcode_zip` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `first_name`, `last_name`, `email`, `password`, `phonenumber`, `role_id`, `status`, `created_at`, `birthdate`, `country_region`, `house_number_street`, `apartment_suite_unit`, `town_city`, `state_province`, `postcode_zip`) VALUES
(1, 'imwinter', 'Minjeong', 'Yu', 'winter@gmail.com', '$2b$10$JrqDlLfCpNe1bJmakjgrK.HrxqAwhUHYuvMCbK13DXMpeACJRPK4y', '0651234567', 1, 'active', '2026-07-16 22:24:52', '2000-12-28', 'THAILAND', '86', '36/63', 'phakret', 'Bangkok', '11120'),
(2, 'aerichandesu', '', '', 'giselle@gmail.com', '$2b$10$JrqDlLfCpNe1bJmakjgrK.HrxqAwhUHYuvMCbK13DXMpeACJRPK4y', '', 2, 'active', '2026-07-16 22:25:04', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'imtaro', 'Pattarapond', 'Saelee', 'pataraporn142548@gmail.com', '$2b$10$DwJSuZT3xZBIg2Gq76RjdO9BbJVjkxRW4lKv8dCwPM2yWWg9EGBRm', '0652939090', 1, 'active', '2026-07-19 17:11:40', '2026-07-20', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `wishlist_id` int NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`wishlist_id`, `user_id`, `product_id`, `created_at`) VALUES
(17, 1, 3, '2026-07-17 18:12:49'),
(18, 1, 11, '2026-07-17 18:13:02'),
(19, 1, 13, '2026-07-17 18:13:15'),
(20, 1, 14, '2026-07-17 18:13:20'),
(22, 1, 17, '2026-07-17 18:13:33'),
(24, 2, 1, '2026-07-18 06:40:30'),
(25, 1, 4, '2026-07-18 11:42:06'),
(26, 1, 5, '2026-07-18 16:09:35'),
(27, 1, 8, '2026-07-18 16:10:16'),
(28, 1, 1, '2026-07-18 16:10:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_slug` (`category_slug`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`variant_id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `unique_product_color_size` (`product_id`,`color`,`size`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `role_name` (`role_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `cart_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `item_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `variant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `wishlist_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_images_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`variant_id`) ON DELETE SET NULL;

--
-- Constraints for table `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE SET NULL;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlists_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
