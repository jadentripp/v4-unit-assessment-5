INSERT INTO helo_users 
(username, password, Profile_pic)
VALUES
('jadoTripp', 'karateLover98', `https://robohash.org/${username}.png`)
RETURNING *;
