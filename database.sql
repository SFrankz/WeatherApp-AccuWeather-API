-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cityKey` varchar(50) NOT NULL,
  `localizedName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (5,'133785','Paris 10e Arrondissement'),(6,'623','Paris'),(7,'133786','Paris 11e Arrondissement'),(8,'133785','Paris 10e Arrondissement'),(9,'623','Paris'),(10,'133787','Paris 12e Arrondissement'),(11,'2258521','Paris 16e Arrondissement'),(12,'133785','Paris 10e Arrondissement'),(13,'133785','Paris 10e Arrondissement'),(14,'133785','Paris 10e Arrondissement'),(15,'133785','Paris 10e Arrondissement'),(16,'133785','Paris 10e Arrondissement'),(17,'623','Paris'),(18,'133792','Paris 18e Arrondissement'),(21,'287430','Bucharest'),(22,'287430','Bucharest'),(23,'213181','Haifa'),(26,'213181','Haifa'),(27,'2213039','Moscow'),(28,'294021','Moscow'),(29,'350829','Moscow'),(30,'294021','Moscow'),(31,'213225','Jerusalem'),(32,'213225','Jerusalem'),(33,'1376675','Jerusalem'),(34,'3496636','Jerusalem'),(35,'214236','Afula'),(36,'214236','Afula'),(37,'249758','Amsterdam'),(38,'249758','Amsterdam'),(40,'249758','Amsterdam'),(41,'249758','Amsterdam'),(42,'249758','Amsterdam'),(43,'249758','Amsterdam'),(44,'249758','Amsterdam'),(46,'213225','Jerusalem'),(50,'249758','Amsterdam'),(52,'51097','Sofia');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather`
--

DROP TABLE IF EXISTS `weather`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weather` (
  `cityKey` varchar(50) NOT NULL,
  `temperature` decimal(5,2) NOT NULL,
  `weatherText` varchar(255) NOT NULL,
  PRIMARY KEY (`cityKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather`
--

LOCK TABLES `weather` WRITE;
/*!40000 ALTER TABLE `weather` DISABLE KEYS */;
INSERT INTO `weather` VALUES ('1015060',33.50,'Sunny'),('122024',26.10,'Fog'),('178087',20.00,'Cloudy'),('187423',27.60,'Sunny'),('213225',25.40,'Sunny'),('214236',31.10,'Sunny'),('215793',29.30,'Sunny'),('2213039',20.00,'Partly cloudy'),('249758',23.90,'Sunny'),('287430',32.30,'Mostly cloudy'),('294021',18.90,'Partly sunny'),('332633',18.00,'Clear'),('3496636',12.50,'Mostly clear'),('350829',21.80,'Mostly cloudy'),('3509283',23.90,'Sunny'),('3509299',23.90,'Sunny'),('3509344',23.90,'Sunny'),('51097',25.00,'Partly sunny');
/*!40000 ALTER TABLE `weather` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-08 17:05:14
