-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               PostgreSQL 17.5 on x86_64-windows, compiled by msvc-19.44.35209, 64-bit
-- Server OS:                    
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table public.categories
DROP TABLE IF EXISTS "categories";
CREATE TABLE IF NOT EXISTS "categories" (
	"id_category" SERIAL NOT NULL,
	"name_category" VARCHAR(100) NOT NULL,
	PRIMARY KEY ("id_category")
);

-- Dumping data for table public.categories: 4 rows
/*!40000 ALTER TABLE "categories" DISABLE KEYS */;
INSERT INTO "categories" ("id_category", "name_category") VALUES
	(1, 'Botol Plastik'),
	(2, 'Peralatan Mandi'),
	(3, 'Kantong Plastik'),
	(4, 'Tempat Makan');
/*!40000 ALTER TABLE "categories" ENABLE KEYS */;

-- Dumping structure for table public.contact_messages
DROP TABLE IF EXISTS "contact_messages";
CREATE TABLE IF NOT EXISTS "contact_messages" (
	"id_contact" SERIAL NOT NULL,
	"id_user" INTEGER NULL DEFAULT NULL,
	"message" TEXT NOT NULL,
	"sent_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("id_contact"),
	CONSTRAINT "contact_messages_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id_user") ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Dumping data for table public.contact_messages: 0 rows
/*!40000 ALTER TABLE "contact_messages" DISABLE KEYS */;
/*!40000 ALTER TABLE "contact_messages" ENABLE KEYS */;

-- Dumping structure for table public.products
DROP TABLE IF EXISTS "products";
CREATE TABLE IF NOT EXISTS "products" (
	"id_product" SERIAL NOT NULL,
	"id_category" INTEGER NULL DEFAULT NULL,
	"name_product" VARCHAR(150) NOT NULL,
	"description" TEXT NULL DEFAULT NULL,
	"price" DOUBLE PRECISION NULL DEFAULT NULL,
	"image_url" VARCHAR(255) NULL DEFAULT NULL,
	PRIMARY KEY ("id_product"),
	CONSTRAINT "products_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories" ("id_category") ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Dumping data for table public.products: 3 rows
/*!40000 ALTER TABLE "products" DISABLE KEYS */;
INSERT INTO "products" ("id_product", "id_category", "name_product", "description", "price", "image_url") VALUES
	(1, 1, 'Botol Minum 1L', 'Botol plastik tahan panas, kapasitas 1 liter.', 15000, 'https://example.com/images/botol1.jpg'),
	(2, 2, 'Ember 20L', 'Ember besar kuat untuk kebutuhan rumah tangga.', 30000, 'https://example.com/images/ember20.jpg'),
	(3, 3, 'Kantong Plastik Ukuran L', 'Kantong plastik tebal untuk belanja.', 5000, 'https://example.com/images/kantongL.jpg');
/*!40000 ALTER TABLE "products" ENABLE KEYS */;

-- Dumping structure for table public.store_description
DROP TABLE IF EXISTS "store_description";
CREATE TABLE IF NOT EXISTS "store_description" (
	"id_store" SERIAL NOT NULL,
	"title" VARCHAR(150) NULL DEFAULT NULL,
	"description" TEXT NULL DEFAULT NULL,
	PRIMARY KEY ("id_store")
);

-- Dumping data for table public.store_description: 1 rows
/*!40000 ALTER TABLE "store_description" DISABLE KEYS */;
INSERT INTO "store_description" ("id_store", "title", "description") VALUES
	(1, 'Toko Plastik HB', 'Kami menjual berbagai kebutuhan plastik rumah tangga dan industri dengan kualitas terbaik dan harga terjangkau.');
/*!40000 ALTER TABLE "store_description" ENABLE KEYS */;

-- Dumping structure for table public.users
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"id_user" SERIAL NOT NULL,
	"username" VARCHAR(50) NOT NULL,
	"email" VARCHAR(100) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	PRIMARY KEY ("id_user"),
	UNIQUE ("username"),
	UNIQUE ("email")
);

-- Dumping data for table public.users: 1 rows
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
INSERT INTO "users" ("id_user", "username", "email", "password") VALUES
	(1, 'admin', 'admin@gmail.com', 'admin123');
/*!40000 ALTER TABLE "users" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
