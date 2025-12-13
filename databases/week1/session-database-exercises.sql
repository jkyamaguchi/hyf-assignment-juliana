-- Returns all users whose name starts with "a"
SELECT * FROM "user" u WHERE u.name like 'a%' ;

-- Returns users who have associated tasks.
SELECT u.* FROM "user" u 
JOIN task t ON u.id = t.user_id ;

-- Returns tasks and tags linked via the task_tag table.
SELECT * FROM task t 
JOIN tag t2 
JOIN task_tag tt 
ON tt.task_id = t.id AND tt.tag_id = t2.id ;

-- Returns users who have matching tasks.
SELECT u.* FROM "user" u 
JOIN task t ON u.id = t.user_id ;

-- Returns each user’s tasks with status and tags.
SELECT u.name, t.title , t2.name , s.name  FROM "user" u 
JOIN task t  ON u.id  = t.user_id 
JOIN status s ON t.status_id = s.id 
JOIN task_tag tt ON t.id  = tt.task_id 
JOIN tag t2 ON tt.tag_id = t2.id ; 