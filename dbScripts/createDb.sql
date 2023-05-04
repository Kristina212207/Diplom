CREATE TABLE vs_user (
  email VARCHAR(255),
  pass VARCHAR(255),
  PRIMARY KEY (email)
);

CREATE TABLE vs_record (
  recordDate DATE,
  startHour TINYINT,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (recordDate, startHour),
  FOREIGN KEY (email) REFERENCES vs_user (email)
);