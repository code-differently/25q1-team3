-- Programs table for SQLite
CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  zip_code VARCHAR(5) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  services TEXT NOT NULL,
  type VARCHAR(255) NOT NULL,
  ages VARCHAR(50) NOT NULL,
  location VARCHAR(255),
  contact_website VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  description TEXT,
  hours VARCHAR(255),
  cost VARCHAR(255),
  registration_info TEXT
);

-- Bookmarks table for SQLite
CREATE TABLE IF NOT EXISTS bookmarks (
  user_id TEXT NOT NULL,
  program_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, program_id),
  FOREIGN KEY (program_id) REFERENCES programs(id)
);
