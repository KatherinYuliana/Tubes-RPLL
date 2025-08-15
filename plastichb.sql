

-- Dumping structure for table public.contact_messages
CREATE TABLE IF NOT EXISTS "contact_messages" (
	"id_contact" SERIAL NOT NULL,
	"id_user" INTEGER NULL DEFAULT NULL,
	"message" TEXT NOT NULL,
	"send_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ("id_contact"),
	CONSTRAINT "contact_messages_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id_user") ON UPDATE NO ACTION ON DELETE SET NULL
);

-- Dumping data for table public.contact_messages: 2 rows
/*!40000 ALTER TABLE "contact_messages" DISABLE KEYS */;
INSERT INTO "contact_messages" ("id_contact", "id_user", "message", "send_at") VALUES
	(1, 9, 'apakah jual plastik sampah?', '2025-08-09 19:51:47.400383'),
	(2, 2, 'kapan ada promo?', '2025-08-09 19:55:39.884602');
/*!40000 ALTER TABLE "contact_messages" ENABLE KEYS */;

-- Dumping structure for table public.orders
CREATE TABLE IF NOT EXISTS "orders" (
	"id_order" SERIAL NOT NULL,
	"id_user" INTEGER NOT NULL,
	"total_amount" NUMERIC(10,2) NOT NULL,
	"status" VARCHAR(20) NULL DEFAULT 'pending',
	"created_at" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
	"payment_method" VARCHAR(50) NULL DEFAULT NULL,
	PRIMARY KEY ("id_order"),
	CONSTRAINT "orders_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users" ("id_user") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.orders: 2 rows
/*!40000 ALTER TABLE "orders" DISABLE KEYS */;
INSERT INTO "orders" ("id_order", "id_user", "total_amount", "status", "created_at", "payment_method") VALUES
	(1, 9, 15000.00, 'completed', '2025-08-11 15:39:29.841825', NULL),
	(2, 9, 30000.00, 'completed', '2025-08-11 16:27:29.812891', 'balance');
/*!40000 ALTER TABLE "orders" ENABLE KEYS */;

-- Dumping structure for table public.order_items
CREATE TABLE IF NOT EXISTS "order_items" (
	"id_order_item" SERIAL NOT NULL,
	"id_order" INTEGER NOT NULL,
	"id_product" INTEGER NOT NULL,
	"quantity" INTEGER NOT NULL,
	"price" NUMERIC(10,2) NOT NULL,
	PRIMARY KEY ("id_order_item"),
	CONSTRAINT "order_items_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "orders" ("id_order") ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT "order_items_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products" ("id_product") ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Dumping data for table public.order_items: 2 rows
/*!40000 ALTER TABLE "order_items" DISABLE KEYS */;
INSERT INTO "order_items" ("id_order_item", "id_order", "id_product", "quantity", "price") VALUES
	(1, 1, 1, 1, 15000.00),
	(2, 2, 2, 1, 30000.00);
/*!40000 ALTER TABLE "order_items" ENABLE KEYS */;

-- Dumping structure for table public.products
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

-- Dumping data for table public.products: 6 rows
/*!40000 ALTER TABLE "products" DISABLE KEYS */;
INSERT INTO "products" ("id_product", "id_category", "name_product", "description", "price", "image_url") VALUES
	(1, 1, 'Botol Minum 1L', 'Botol plastik tahan panas, kapasitas 1 liter, warna biru', 15000, 'botol minum.jpg'),
	(2, 2, 'Ember 20L', 'Ember besar kuat untuk kebutuhan rumah tangga.', 30000, 'ember.jpeg'),
	(3, 3, 'Kantong Plastik', 'Kantong plastik tebal warna biru untuk belanja.', 5000, 'kantong plastik.jpg'),
	(6, 4, 'Tempat Makan', 'Tempat makan plastik bening ukuran sedang', 8000, 'tempat-makan-plastik.jpeg'),
	(7, 2, 'Gayung', 'gayung plastik warna biru', 10000, 'gayung plastik.jpg'),
	(8, 3, 'Plastik Ziplock', 'Plastik ziplock bening ukuran 25 x 35 cm isi 100', 12000, 'plastik ziplock.png');
/*!40000 ALTER TABLE "products" ENABLE KEYS */;

-- Dumping structure for table public.store_description
CREATE TABLE IF NOT EXISTS "store_description" (
	"id_store" SERIAL NOT NULL,
	"address" VARCHAR(500) NULL DEFAULT NULL::character varying,
	"description" TEXT NULL DEFAULT NULL,
	"maps_url" VARCHAR(500) NULL DEFAULT NULL,
	"phone_number" VARCHAR(50) NULL DEFAULT NULL::character varying,
	"opening_hours" VARCHAR(50) NULL DEFAULT NULL::character varying,
	PRIMARY KEY ("id_store")
);

-- Dumping data for table public.store_description: 1 rows
/*!40000 ALTER TABLE "store_description" DISABLE KEYS */;
INSERT INTO "store_description" ("id_store", "address", "description", "maps_url", "phone_number", "opening_hours") VALUES
	(1, 'Jl. Dipati Ukur No.80-84, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132', 'Kami menjual berbagai kebutuhan plastik rumah tangga dan industri dengan kualitas terbaik dan harga terjangkau...', '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1980.5052559804633!2d107.6148113!3d-6.8893435!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e655d336aaab%3A0xc48b605e8e3d2915!2sInstitut%20Teknologi%20Harapan%20Bangsa!5e0!3m2!1sid!2sid!4v1754737181848!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>', '08123456789', 'Senin - Sabtu, 08.00 - 17.00');
/*!40000 ALTER TABLE "store_description" ENABLE KEYS */;

-- Dumping structure for table public.users
CREATE TABLE IF NOT EXISTS "users" (
	"id_user" SERIAL NOT NULL,
	"username" VARCHAR(50) NOT NULL,
	"email" VARCHAR(100) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"image_profile" VARCHAR(255) NULL DEFAULT NULL,
	"balance" NUMERIC(10,2) NULL DEFAULT 0,
	PRIMARY KEY ("id_user"),
	UNIQUE ("username"),
	UNIQUE ("email")
);

-- Dumping data for table public.users: 3 rows
/*!40000 ALTER TABLE "users" DISABLE KEYS */;
INSERT INTO "users" ("id_user", "username", "email", "password", "image_profile", "balance") VALUES
	(1, 'admin', 'admin@gmail.com', 'admin123', 'template.jpg', 0.00),
	(2, 'User1', 'user@gmail.com', 'user321', 'template.jpg', 0.00),
	(9, 'Katherin', 'katherin@gmail.com', 'kath123', 'template.jpg', 40000.00);
/*!40000 ALTER TABLE "users" ENABLE KEYS */;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
