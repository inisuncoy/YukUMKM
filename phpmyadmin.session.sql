USE we_made_daily;

-- 1. Menampilkan data member
-- 2. ⁠menampilkan data komentar dan user yang berkomentar
-- 3. ⁠menampilkan nama user dan member rolenya
-- 4. ⁠menampilkan review member dan grup nya
-- 5. ⁠menampilkan gambar review dan user nya mengirim

-- 1. Menampilkan data member
SELECT 
    u.id AS "ID", 
    CONCAT(u.firstName, ' ', u.lastName) AS "Full Name",
    u.email AS "Email",
    u.username AS "Username",
    u.phone_number AS "Phone Number",
    ru.name AS "Role"
FROM 
    user u
JOIN 
    role_user ru ON u.role_id = ru.id
WHERE 
    ru.name = 'Member';



