-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2024 at 05:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12
USE db_bookuet;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin12345';
flush privileges;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

--
-- Database: `uet_book_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--
SET FOREIGN_KEY_CHECKS = 0;
USE db_bookuet;
CREATE TABLE `admin` (
  `username` text NOT NULL,
  `password` text NOT NULL,
  `phone` varchar(12) NOT NULL,
  `address` text NOT NULL,
  `id` int(11) NOT NULL,
  `fullName` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`, `phone`, `address`, `id`, `fullName`, `email`) VALUES
('sang', '2', '3', '4', 1, '5', '[value-6]');

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` text NOT NULL,
  `authorId` int(11) NOT NULL,
  `languageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  `id` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rental`
--

CREATE TABLE `rental` (
  `id` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `rentalDate` date NOT NULL,
  `returnDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `phone` text DEFAULT NULL,
  `address` text NOT NULL,
  `email` text NOT NULL,
  `fullName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `phone`, `address`, `email`, `fullName`) VALUES
(1, 'sang', '123456', '123456789', 'edas', '123123', 'do sang');

-- --------------------------------------------------------

--
-- Table structure for table `user_test`
--
CREATE TABLE `user_test` (
  `id` int(11) NOT NULL,
  `usr_name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `phone` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `address` text  NOT NULL,
  `fullName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_test`
--

INSERT INTO `user_test` (`id`, `usr_name`, `password`, `phone`, `email`, `address`, `fullName`) VALUES
(1, 'sang', '$2b$10$KyGR4W.8N9En5/6M4TEYJuD', NULL, NULL, NULL, 'sangdo'),
(2, 'sang', '$2b$10$dURexmk8hfR46hgKZHc8KOD', NULL, NULL, NULL, 'sangdo'),
(3, 'sang', '$2b$10$NlexItbuETfNzy0CwctRS.E', NULL, NULL, NULL, 'sangdo'),
(4, 'sang', '$2b$10$AzsysDgpM1KR26QUFldOL.h', NULL, NULL, NULL, 'sangdo'),
(5, 'sang', '$2b$10$e9ovulXkbvqDKph9p9sR8.k', NULL, NULL, NULL, 'sangdo'),
(6, 'sang', '$2b$10$MlqofuRXJuBIKyAHBG1ZfuF', NULL, NULL, NULL, 'sangdo'),
(7, 'sang', '$2b$10$FzRqmSbEzqW8NaCmRVuuCeb', NULL, NULL, NULL, 'sangdo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_language_id` (`languageId`);

--
-- Indexes for table `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rental`
--
ALTER TABLE `rental`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_book_id` (`bookId`),
  ADD KEY `fk_user_id` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_test`
--
ALTER TABLE `user_test`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `language`
--
ALTER TABLE `language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rental`
--
ALTER TABLE `rental`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_test`
--
ALTER TABLE `user_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `fk_language_id` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`);

--
-- Constraints for table `rental`
--
ALTER TABLE `rental`
  ADD CONSTRAINT `fk_book_id` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`),
  ADD CONSTRAINT `fk_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
