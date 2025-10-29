-- TechnoFest MySQL schema
-- Adjust engine/charset as needed

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone_number VARCHAR(20) NOT NULL,
  role ENUM('participant','organizer','super') DEFAULT 'participant',
  department VARCHAR(50),
  year_of_study VARCHAR(20),
  college VARCHAR(150),
  emergency_contact VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category ENUM('technical','cultural','sports','workshop') NOT NULL,
  day ENUM('day1','day2') NOT NULL,
  dept VARCHAR(50),
  time VARCHAR(50),
  venue VARCHAR(100),
  description TEXT,
  prize VARCHAR(50),
  capacity INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registration_id VARCHAR(20) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  pass_type ENUM('day1','day2','both') NOT NULL,
  meal_pref VARCHAR(50),
  tshirt_size VARCHAR(10),
  need_accommodation TINYINT(1) DEFAULT 0,
  need_transport TINYINT(1) DEFAULT 0,
  payment_status ENUM('pending','paid') DEFAULT 'pending',
  day1_attendance ENUM('Absent','Present') DEFAULT 'Absent',
  day2_attendance ENUM('Absent','Present') DEFAULT 'Absent',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reg_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registration_id VARCHAR(20) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  method VARCHAR(20) NOT NULL,
  transaction_id VARCHAR(64),
  upi_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (registration_id),
  CONSTRAINT fk_pay_reg FOREIGN KEY (registration_id) REFERENCES registrations(registration_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reg_id VARCHAR(20) NOT NULL UNIQUE,
  participant_name VARCHAR(150) NOT NULL,
  event_name VARCHAR(150) NOT NULL,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cert_reg FOREIGN KEY (reg_id) REFERENCES registrations(registration_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Event registrations (per-event signups)
CREATE TABLE IF NOT EXISTS event_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  registration_id VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_event_reg (event_id, registration_id),
  CONSTRAINT fk_er_event FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  CONSTRAINT fk_er_reg FOREIGN KEY (registration_id) REFERENCES registrations(registration_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Seed sample events (optional)
INSERT INTO events (name, category, day, dept, time, venue, description, prize, capacity) VALUES
('AI Hackathon', 'technical', 'day1', 'cse', '10:00 AM', 'Auditorium', 'Team-based AI challenge.', '₹50,000', 100),
('Robo Race', 'technical', 'day2', 'ece', '02:00 PM', 'Grounds', 'Autonomous robot racing.', '₹30,000', 80),
('Battle of Bands', 'cultural', 'day1', 'na', '06:00 PM', 'Open Stage', 'Live music competition.', '₹20,000', 500)
ON DUPLICATE KEY UPDATE name = VALUES(name);
