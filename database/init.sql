USE profile_db;

-- Au cas où la table n'existerait pas encore au moment du script d'init brut
CREATE TABLE IF NOT EXISTS user_types (
                                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                          type VARCHAR(255) NOT NULL
    );

-- Insertion ou mise à jour du type undefined par défaut avec l'ID 1
INSERT INTO user_types (id, type) VALUES (1, 'undefined')
    ON DUPLICATE KEY UPDATE type = 'undefined';