CREATE TABLE user (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	phone VARCHAR(255)
);

CREATE TABLE status (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(255) NOT NULL
);

CREATE TABLE task (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(255),
    created DATETIME NOT NULL,
    updated DATETIME,
    due_date DATETIME,
    status_id INTEGER NOT NULL DEFAULT 1,
	FOREIGN KEY (status_id) REFERENCES status(id)
);

CREATE TABLE user_task (
    user_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, task_id),
    FOREIGN KEY (user_id) REFERENCES USER(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- PART 1
-- 1. Insert a new user with your own name and email
INSERT INTO user (name, email, phone) VALUES ('Juliana Yamaguchi', 'jkyamaguchi@gmail.com', '123-456-7890');

-- 2. Insert a new task assigned to yourself.
INSERT INTO task (title, description, created, updated, due_date, status_id) VALUES ('Learn SQL', 'Practice database queries', 'datetime('now'), datetime('now'), datetime('now', '+7 days'), 2);
INSERT INTO user_task (user_id, task_id) VALUES(12, 36);

-- 3. Update the title of the task you just created to "Master SQL Basics"
UPDATE task
SET title = 'Master SQL Basics',
updated = DATETIME('now')
WHERE id = 36;

-- 4. Change the due date of your task to two weeks from today
UPDATE task
SET due_date = DATE('now', '+14 days')
WHERE id = 36;

-- 5. Change the status of your task to "Done"
UPDATE task
SET status_id = (SELECT id FROM status WHERE name = 'Done')
WHERE id = 36;

-- 6. Delete one of the tasks in the database (choose any task)
DELETE FROM user_task
WHERE task_id = 35;

DELETE FROM task
WHERE id = 35;

-- PART 2
-- 1. List all users who don't have any tasks assigned
SELECT u.name
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
WHERE ut.task_id IS NULL;

-- 2. Find all tasks with a status of "Done"
SELECT t.title
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name = 'Done';

-- 3. Find all overdue tasks (due_date is earlier than today)
SELECT t.*
FROM task t
JOIN status s ON t.status_id = s.id
WHERE t.due_date < DATE('now')
  AND s.name != 'Done';

-- PART 3
-- 1. Add a new column called priority to the task table.
ALTER TABLE task
ADD COLUMN priority TEXT
CHECK (priority IN ('Low', 'Medium', 'High'))
DEFAULT 'Medium';

-- 2. Update some existing tasks to have different priority values
UPDATE task
SET priority = 'Low'
WHERE status_id = (SELECT id FROM status WHERE name = 'Done');

UPDATE task
SET priority = 'High'
WHERE id IN (4, 6, 22, 27, 28);

-- 3. Create a new table called category
CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(50)
);

-- 4. Create a linking table called task_category
CREATE TABLE task_category (
    task_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, category_id),
    FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. Insert at least 3 categories
INSERT INTO category (name, color) VALUES
('Work', 'red'),
('Personal', 'blue'),
('Study', 'green');

-- 6. Assign categories to at least 5 different tasks
INSERT INTO task_category (task_id, category_id) VALUES
(36, 3),  -- Master SQL Basics → Study
(12, 1),  -- Some task → Work
(18, 2),  -- Some task → Personal
(22, 1),  -- Some task → Work
(25, 3);  -- Some task → Study

-- PART 4
-- 1. Find all tasks in a specific category (e.g., "Work")
SELECT t.title, t.due_date, t.priority 
FROM task t
JOIN task_category tc ON t.id = tc.task_id
JOIN category c ON tc.category_id = c.id
WHERE c.name = 'Work';

-- 2. List tasks ordered by priority (High to Low) and by due date (earliest first)
SELECT *
FROM task
ORDER BY
    CASE priority
        WHEN 'High' THEN 1
        WHEN 'Medium' THEN 2
        WHEN 'Low' THEN 3
        ELSE 4
    END,
    due_date ASC;

-- 3. Find which category has the most tasks
SELECT 
    c.name AS category_name,
    COUNT(tc.task_id) AS task_count
FROM category c
LEFT JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id, c.name
ORDER BY task_count DESC
LIMIT 1;

-- 4. Get all high priority tasks that are either "In progress" or "Not started"
SELECT t.*
FROM task t
JOIN status s ON t.status_id = s.id
WHERE t.priority = 'High'
  AND s.name IN ('In progress', 'Not started');

-- 5. Find users who have tasks in more than one category
SELECT 
    u.id,
    u.name,
    COUNT(DISTINCT c.id) AS category_count
FROM user u
JOIN user_task ut ON u.id = ut.user_id
JOIN task_category tc ON ut.task_id = tc.task_id
JOIN category c ON tc.category_id = c.id
GROUP BY u.id, u.name
HAVING COUNT(DISTINCT c.id) > 1;