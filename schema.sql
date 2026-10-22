DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS regalos;

CREATE TABLE regalos (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  url TEXT
);

-- PK en regalo_id => solo puede existir UNA reserva por regalo (bloqueo atómico)
CREATE TABLE reservas (
  regalo_id INTEGER PRIMARY KEY REFERENCES regalos(id),
  nombres TEXT NOT NULL,
  creado_en TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO regalos (id, nombre, url) VALUES
 (1, 'Bañera cambiador', 'https://infanti.com.pe/products/banera-c-cambiador-c-2-niveles-stars?variant=53009561157932'),
 (2, 'Coche completo o travel system', 'https://nua.pe/products/coche-pact-pro-travel-system-shale-joie?variant=44898746400941'),
 (3, 'Cuna corral', 'https://www.carestino.com.pe/producto/cuna-corral-genova-beige/'),
 (4, 'Set de biberones de recién nacido', 'https://www.promart.pe/set-recien-nacido-avent-natural-transparente-scd301-01-1000548256/p'),
 (5, 'Esterilizador', 'https://infanti.com.pe/products/scf281-02-esterilizador-microondas-avent?variant=46836644544812'),
 (6, 'Monitor con radiofrecuencia', 'https://www.amazon.com/-/es/PHILIPS-Avent-conversaci%C3%B3n-temperatura-canciones/dp/B07L9SPTFL'),
 (7, 'Extractor de leche', 'https://www.falabella.com.pe/falabella-pe/product/17284674/extractor-de-leche-electrico-doble/17284674'),
 (8, 'Mochila o fular porta bebé', NULL),
 (9, 'Pañalera tipo mochila', NULL);
