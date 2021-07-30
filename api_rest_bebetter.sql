-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2021 a las 17:46:14
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `api_rest_bebetter`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auto_personal`
--

CREATE TABLE `auto_personal` (
  `id_auto` int(11) NOT NULL,
  `auto_auto` varchar(30) NOT NULL,
  `marc_auto` varchar(15) NOT NULL,
  `year_auto` int(4) NOT NULL,
  `rel_pers_id` int(11) NOT NULL,
  `est_auto` enum('1','0') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `auto_personal`
--

INSERT INTO `auto_personal` (`id_auto`, `auto_auto`, `marc_auto`, `year_auto`, `rel_pers_id`, `est_auto`) VALUES
(1, 'Corollass', 'Chevrolet', 1999, 1, '1'),
(2, 'Corolla2', 'Chevrolet23', 2001, 1, '1'),
(3, 'Corollsa2', 'Chevrolet2', 2001, 1, '1'),
(4, 'asdasd', '12312', 123, 1, '1'),
(5, 'sentra', 'nissan', 2005, 2, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id_pers` int(11) NOT NULL,
  `nom_pers` varchar(50) NOT NULL,
  `ape_pers` varchar(50) NOT NULL,
  `cedu_pers` varchar(20) NOT NULL,
  `fech_nac_pers` date NOT NULL,
  `sexo_pers` enum('Masculino','Femenino') NOT NULL,
  `prof_pers` varchar(15) NOT NULL,
  `dire_pers` text NOT NULL,
  `mun_pers` varchar(50) NOT NULL,
  `tel_pers` varchar(15) NOT NULL,
  `est_pers` enum('1','0') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id_pers`, `nom_pers`, `ape_pers`, `cedu_pers`, `fech_nac_pers`, `sexo_pers`, `prof_pers`, `dire_pers`, `mun_pers`, `tel_pers`, `est_pers`) VALUES
(1, 'adams juliany', 'contreras ramirez', '24819181', '2021-07-05', 'Masculino', 'ingeniero', 'centroasds', 'san cristobal', '0276-3414294', '1'),
(2, 'bdams juliany', 'dontreras ramirez', '14819181', '2021-07-05', 'Masculino', 'ingeniero', 'centro San Cirstoal', 'san cristobal', '0276-3414294', '0'),
(3, 'Juhantonny', 'contreras', '123123123', '2021-07-29', 'Femenino', 'estudiante', 'centro de sc ', 'San Cristobal', '3219225418', '1'),
(4, 'omaira', 'contreras', '24819181', '1983-01-04', 'Femenino', 'repostera', 'avenida 4 e al lado del home center de cucuta norte de santander colombia', 'San Cristóbal', '3219225418', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auto_personal`
--
ALTER TABLE `auto_personal`
  ADD PRIMARY KEY (`id_auto`),
  ADD KEY `rel_pers_id` (`rel_pers_id`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id_pers`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auto_personal`
--
ALTER TABLE `auto_personal`
  MODIFY `id_auto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id_pers` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `auto_personal`
--
ALTER TABLE `auto_personal`
  ADD CONSTRAINT `auto_personal_ibfk_1` FOREIGN KEY (`rel_pers_id`) REFERENCES `personal` (`id_pers`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
