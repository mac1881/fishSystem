CREATE DATABASE admin_panel;

USE admin_panel;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(100),
    email VARCHAR(100)
);

INSERT INTO users (ad, email) VALUES ('Ali Veli', 'ali@example.com');
INSERT INTO users (ad, email) VALUES ('Ayşe Fatma', 'ayse@example.com');
    function goToDataEntry(building) {
            // Seçilen binaya göre veri giriş sayfasına yönlendirme
            window.location.href = `veri-girisi-${building}.html`;
        }