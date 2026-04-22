-- ============================================================
-- Week 2 Assignment — Databases
-- Student: Juliana
-- ============================================================
-- Part A, Q1
-- Count the total number of tasks in the database.
SELECT COUNT(*) AS total_tasks
FROM task;

-- Part A, Q2
-- Count how many tasks each user has been assigned (include users with zero tasks)
SELECT 
    u.id,
    u.name,
    COUNT(ut.task_id) AS task_count
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
GROUP BY u.id, u.name
ORDER BY task_count DESC;

-- Part A, Q3
-- Find the number of tasks per status (e.g., how many are "To Do", "In Progress", "Done")
SELECT 
    s.name AS status_name,
    COUNT(t.id) AS task_count
FROM status s
LEFT JOIN task t ON t.status_id = s.id
GROUP BY s.id, s.name
ORDER BY task_count DESC;

-- Part A, Q4
-- Find the user who has the most tasks assigned
SELECT 
    u.id,
    u.name,
    COUNT(ut.task_id) AS task_count
FROM user u
LEFT JOIN user_task ut ON u.id = ut.user_id
GROUP BY u.id, u.name
ORDER BY task_count DESC
LIMIT 1;

-- Part A, Q5
-- Calculate the average number of tasks per user (only count users who have at least one task)
SELECT AVG(task_count) AS avg_tasks_per_user
FROM (
    SELECT u.id, COUNT(ut.task_id) AS task_count
    FROM user u
    JOIN user_task ut ON u.id = ut.user_id   -- INNER JOIN excludes users with zero tasks
    GROUP BY u.id
);

-- Part A, Q6
-- Find the earliest and latest due date across all tasks
SELECT 
    MIN(due_date) AS earliest_due_date,
    MAX(due_date) AS latest_due_date
FROM task;

-- Part A, Q7
-- List each category along with the number of tasks it contains, ordered from most to least tasks
SELECT 
    c.name AS category_name,
    COUNT(tc.task_id) AS task_count
FROM category c
LEFT JOIN task_category tc ON c.id = tc.category_id
GROUP BY c.id, c.name
ORDER BY task_count DESC;

-- Part A, Q8
-- Find all users who have more than 2 tasks assigned to them
SELECT 
    u.id,
    u.name,
    COUNT(ut.task_id) AS task_count
FROM user u
JOIN user_task ut ON u.id = ut.user_id
GROUP BY u.id, u.name
HAVING COUNT(ut.task_id) > 2;

-- Part B, Q1.1
-- The condition '1'='1' is always true, so the subquery no longer filters by a real user name.
-- Instead, it returns every row it can, causing the outer query to return all tasks in the database.
-- This is dangerous because it shows how an attacker can inject their own SQL logic into the query.

-- Part B, Q1.2
-- SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = ''; DROP TABLE user; --')

-- Part B, Q2
-- function getTasksByUser(userName) {
--   // Input passed separately — never touches the SQL string
--   const query = `SELECT * FROM task
--     WHERE user_id = (
--       SELECT id FROM user
--       WHERE name = ?
--     )`;

--   db.all(query, [userName], (err, rows) => {
--     displayResults(rows);
--   });
-- }

-- Part C, Q1
BEGIN TRANSACTION;
-- Step 1: Reassign all tasks from departing_user_id to new_user_id
UPDATE user_task
SET user_id = :new_user_id
WHERE user_id = :departing_user_id;

-- Step 2: Delete the departing user
DELETE FROM user
WHERE id = :departing_user_id;

COMMIT;


-- Part C, Q2
BEGIN TRANSACTION;

-- Step 1: Attempt to reassign tasks from departing user to new user
UPDATE task
SET user_id = :new_user_id
WHERE user_id = :departing_user_id;

-- Step 2: Intentionally trigger a failure
-- Insert a user_task with an invalid task_id to force a foreign key error
INSERT INTO user_task (user_id, task_id)
VALUES (:new_user_id, 9999);

-- If the INSERT fails, COMMIT is never reached
COMMIT;

-- Part D
BEGIN TRANSACTION;

-- 1. Create the new "Urgent" category
INSERT INTO category (name, color) 
VALUES ('Urgent', 'yellow');

-- 2. Link all "In progress" or "Not started" tasks to this new category
INSERT INTO task_category (task_id, category_id)
SELECT t.id, (SELECT id FROM category WHERE name = 'Urgent')
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name IN ('In progress', 'Not started');

COMMIT;

-- Dashboard
SELECT 
    COUNT(t.id) AS total_tasks,
    
    SUM(CASE WHEN s.name = 'Done' THEN 1 ELSE 0 END) AS completed_tasks,
    
    SUM(CASE WHEN t.due_date < DATE('now') AND s.name != 'Done' THEN 1 ELSE 0 END) AS overdue_tasks,
    
    (SELECT COUNT(DISTINCT user_id) FROM user_task) AS users_with_tasks
FROM task t
LEFT JOIN status s ON t.status_id = s.id;

