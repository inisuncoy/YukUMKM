USE we_made_daily;

-- 1. Menampilkan data member
-- 2. ⁠menampilkan data komentar dan user yang berkomentar
-- 3. ⁠menampilkan nama user dan member rolenya
-- 4. ⁠menampilkan review member dan grup nya
-- 5. melihat forum yang ada di grup

-- 1. Menampilkan data member
SELECT 
    u.id AS "ID", 
    CONCAT(u.firstName, ' ', u.lastName) AS "Full Name",
    u.email AS "Email",
    u.username AS "Username",
    u.phone_number AS "Phone Number"
FROM 
    user u
WHERE 
    u.role_id = 2;



-- 2. ⁠menampilkan data komentar dan user yang berkomentar
SELECT 
    c.id AS "ID",
    c.comment AS "Comment",
    CONCAT(u.firstName, ' ', u.lastName) AS "Full Name"
FROM
    comment c
JOIN
    user u ON c.user_id = u.id;

-- 3. ⁠menampilkan nama user dan member rolenya
SELECT 
    CONCAT(u.firstName, ' ', u.lastName) AS "Full Name",
    ru.name AS "Role"
FROM
    user u
JOIN
    role_user ru ON u.role_id = ru.id;

-- 4. ⁠menampilkan review product dan grup nya
SELECT 
    CONCAT(u.firstName, ' ', u.lastName) AS "Full Name",
    r.rating AS "Rating",
    r.comment AS "Comment",
    r.usagePeriod AS "Usage Period",
    p.name AS "Product",
    g.name AS "Group"
FROM
    review r
JOIN
    user u ON r.user_id = u.id
JOIN
    product p ON r.product_id = p.id
JOIN
    `group` g ON p.group_id = g.id;


-- 5. melihat forum yang ada di grup
SELECT 
    f.id AS "ID",
    f.topic AS "Topic",
    CONCAT(u.firstName, ' ', u.lastName) AS "Full Name"
FROM
    forum f
JOIN
    user u ON f.user_id = u.id;










