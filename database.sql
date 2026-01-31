
CREATE DATABASE mcd_water_management;
USE mcd_water_management;

CREATE TABLE mcd_staff (
    mcd_gmail VARCHAR(100) PRIMARY KEY,
    mcd_name VARCHAR(100),
    mcd_password VARCHAR(100),
    mcd_post VARCHAR(50)
);

CREATE TABLE users (
    user_gmail VARCHAR(100) PRIMARY KEY,
    user_name VARCHAR(100),
    user_city VARCHAR(100),
    water_quality ENUM('Good','Bad','Severe')
);

CREATE TABLE city_dataset (
    city_name VARCHAR(100) PRIMARY KEY,
    overall_quality ENUM('Good','Bad','Severe')
);

CREATE TABLE complaints (
    complaint_id INT PRIMARY KEY,
    user_gmail VARCHAR(100),
    city_name VARCHAR(100),
    reported_status ENUM('Good','Bad','Severe'),
    work_status ENUM('Pending','Resolved'),
    time DATE,

    FOREIGN KEY (user_gmail) REFERENCES users(user_gmail)
);

INSERT INTO mcd_staff VALUES
('amit.sharma@mcd.in','Amit Sharma','Amit@123','Engineer'),
('ravi.verma@mcd.in','Ravi Verma','Ravi@234','Supervisor'),
('neha.singh@mcd.in','Neha Singh','Neha@345','Technician'),
('pooja.patel@mcd.in','Pooja Patel','Pooja@456','Manager'),
('ankit.jain@mcd.in','Ankit Jain','Ankit@567','Inspector'),
('suresh.kumar@mcd.in','Suresh Kumar','Suresh@678','Engineer'),
('kiran.rao@mcd.in','Kiran Rao','Kiran@789','Clerk'),
('rohit.mehta@mcd.in','Rohit Mehta','Rohit@890','Supervisor'),
('sunita.das@mcd.in','Sunita Das','Sunita@901','Technician'),
('vikas.malhotra@mcd.in','Vikas Malhotra','Vikas@012','Manager');

INSERT INTO users VALUES
('rahul@gmail.com','Rahul Gupta','Rohini','Bad'),
('sneha@gmail.com','Sneha Roy','Pitampura','Bad'),
('arjun@gmail.com','Arjun Patel','Model Town','Bad'),
('priya@gmail.com','Priya Nair','Azadpur','Bad'),
('karan@gmail.com','Karan Singh','Narela','Severe'),
('anjali@gmail.com','Anjali Verma','Saket','Good'),
('rohit@gmail.com','Rohit Bansal','Dwarka','Good'),
('ritu@gmail.com','Ritu Kapoor','Vasant Kunj','Good'),
('manish@gmail.com','Manish Khanna','Hauz Khas','Bad'),
('sonal@gmail.com','Sonal Mehta','Malviya Nagar','Bad'),
('deepak@gmail.com','Deepak Yadav','Janakpuri','Bad'),
('pooja@gmail.com','Pooja Arora','Rajouri Garden','Bad'),
('naveen@gmail.com','Naveen Jain','Punjabi Bagh','Bad'),
('amit@gmail.com','Amit Tandon','Karol Bagh','Bad'),
('neeraj@gmail.com','Neeraj Malhotra','Connaught Place','Bad'),
('vikram@gmail.com','Vikram Sethi','Laxmi Nagar','Severe'),
('rekha@gmail.com','Rekha Pandey','Mayur Vihar','Bad'),
('alok@gmail.com','Alok Mishra','Preet Vihar','Bad'),
('sunil@gmail.com','Sunil Rawat','Shahdara','Severe'),
('mehul@gmail.com','Mehul Shah','Rohini','Bad'),
('pankaj@gmail.com','Pankaj Goel','Dwarka','Good'),
('swati@gmail.com','Swati Gupta','Saket','Good'),
('harsh@gmail.com','Harsh Jain','Janakpuri','Bad'),
('tina@gmail.com','Tina Sood','Pitampura','Bad'),
('varun@gmail.com','Varun Saxena','Vasant Kunj','Good');

INSERT INTO city_dataset (city_name, overall_quality) VALUES
('Rohini','Bad'),
('Pitampura','Bad'),
('Model Town','Bad'),
('Azadpur','Bad'),
('Narela','Severe'),

('Saket','Good'),
('Dwarka','Good'),
('Vasant Kunj','Good'),
('Hauz Khas','Bad'),
('Malviya Nagar','Bad'),

('Janakpuri','Bad'),
('Rajouri Garden','Bad'),
('Punjabi Bagh','Bad'),
('Karol Bagh','Bad'),
('Connaught Place','Bad'),

('Laxmi Nagar','Severe'),
('Mayur Vihar','Bad'),
('Preet Vihar','Bad'),
('Shahdara','Severe'),
('Anand Vihar','Bad');


INSERT INTO complaints VALUES

(1001,'rahul@gmail.com','Rohini','Bad','Pending','2024-11-10'),
(1002,'sneha@gmail.com','Pitampura','Bad','Resolved','2024-11-15'),
(1003,'karan@gmail.com','Narela','Severe','Pending','2024-11-18'),
(1004,'vikram@gmail.com','Laxmi Nagar','Severe','Pending','2024-11-22'),
(1005,'sunil@gmail.com','Shahdara','Severe','Resolved','2024-11-25'),

(1006,'manish@gmail.com','Hauz Khas','Bad','Pending','2024-12-01'),
(1007,'deepak@gmail.com','Janakpuri','Bad','Resolved','2024-12-05'),
(1008,'alok@gmail.com','Preet Vihar','Bad','Pending','2024-12-08'),
(1009,'rekha@gmail.com','Mayur Vihar','Bad','Resolved','2024-12-12'),
(1010,'amit@gmail.com','Karol Bagh','Bad','Pending','2024-12-15'),

(1011,'anjali@gmail.com','Saket','Good','Resolved','2024-12-20'),
(1012,'rohit@gmail.com','Dwarka','Good','Resolved','2024-12-22'),
(1013,'ritu@gmail.com','Vasant Kunj','Good','Resolved','2024-12-25'),

(1014,'karan@gmail.com','Narela','Severe','Pending','2025-01-02'),
(1015,'vikram@gmail.com','Laxmi Nagar','Severe','Pending','2025-01-05'),

(1016,'mehul@gmail.com','Rohini','Bad','Resolved','2025-01-08'),
(1017,'tina@gmail.com','Pitampura','Bad','Pending','2025-01-10'),
(1018,'harsh@gmail.com','Janakpuri','Bad','Resolved','2025-01-12'),
(1019,'pooja@gmail.com','Rajouri Garden','Bad','Pending','2025-01-15'),
(1020,'neeraj@gmail.com','Connaught Place','Bad','Resolved','2025-01-18'),

(1021,'swati@gmail.com','Saket','Good','Resolved','2025-01-22'),
(1022,'pankaj@gmail.com','Dwarka','Good','Resolved','2025-01-25'),

(1023,'varun@gmail.com','Vasant Kunj','Good','Resolved','2025-02-01'),
(1024,'priya@gmail.com','Azadpur','Bad','Pending','2025-02-05'),

(1025,'arjun@gmail.com','Model Town','Bad','Resolved','2025-02-08'),
(1026,'naveen@gmail.com','Punjabi Bagh','Bad','Pending','2025-02-10'),
(1027,'neeraj@gmail.com','Connaught Place','Bad','Pending','2025-02-12'),
(1028,'deepak@gmail.com','Janakpuri','Bad','Resolved','2025-02-15'),

(1029,'vikram@gmail.com','Laxmi Nagar','Severe','Pending','2025-02-18'),
(1030,'sunil@gmail.com','Shahdara','Severe','Pending','2025-02-20'),

(1031,'karan@gmail.com','Narela','Severe','Resolved','2025-02-25'),
(1032,'mehul@gmail.com','Rohini','Bad','Pending','2025-03-01'),

(1033,'anjali@gmail.com','Saket','Good','Resolved','2025-03-05'),
(1034,'rohit@gmail.com','Dwarka','Good','Resolved','2025-03-08'),

(1035,'alok@gmail.com','Preet Vihar','Bad','Pending','2025-03-12');

