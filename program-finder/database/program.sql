CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zip_code VARCHAR(5) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    services TEXT NOT NULL,
    type VARCHAR(255) NOT NULL,
    ages VARCHAR(50) NOT NULL
);

INSERT INTO programs (zip_code, organization, services, type, ages) VALUES
('19801', 'Walnut Street YMCA', 'Offers preschool, school-age childcare, youth development, teen leadership programs, summer day camps, swim lessons, and lifeguard training.', 'Sports, education, lifeguard', '2mos - 17yrs'),
('19801', 'Central YMCA', 'Provides preschool programs and childcare services.', 'Preschool, Childcare', '2mos - 5yrs'),
('19801', 'Wilmington Youth Rowing Association (WYRA)', 'Inclusive rowing programs for youth of all abilities and backgrounds.', 'Rowing Programs/Sports', '11 - 18yrs'),
('19801', 'Youth Public Safety Academy', 'A two-week program introducing youth to public safety careers and training.', 'Career training, education', '13 - 17yrs'),
('19801', 'Serviam Girls Academy', 'Tuition-free education for girls in grades 5–8, focusing on academic excellence and leadership.', 'Education, Leadership', '10 - 14yrs'),
('19801', 'Mary Campbell Center', 'Children and Youth Program: Offers unique activities for children with special needs and their families.', 'Special Needs, activites', '3 - 21yrs'),
('19802', 'UrbanPromise Wilmington', 'Provides after-school programs, summer camps, and leadership training for youth.', 'Education, After-School Programs, Summer Camp, Leadership Training', '14-18yrs'),
('19802', 'Police Athletic League of Wilmington (PALW)', 'Offers before and after care programs, summer camps, and educational activities.', 'Before After Care, Summer Camp, Educational, Activities', '8 - 18yrs'),
('19802', 'Kingswood Community Center', 'Features early learning programs, after-school activities, and teen engagement initiatives.', 'Education, activties', '1 - 5yrs, 5 - 18yrs'),
('19802', 'The Warehouse', 'A teen-designed community center offering programs for ages 13–19, including leadership and educational support.', 'Teen Programs, Leadership, Educational Support', '13 - 19yrs'),
('19802', 'i9 Sports at Wilmington-Pilot School', 'Provides youth sports leagues, camps, and clinics focusing on fun and skill development.', 'Sports - Basketball, Flag football, soccer, baseball', '3 - 17yrs'),
('19802', 'Haynes Park – Summer Food Service Program', 'Offers free breakfast and lunch during summer months to youth in the community.', 'Summer Food Service', '1 - 18yrs'),
('19803', 'Brandywine YMCA', 'Offers youth sports, enrichment workshops, swim lessons, summer camps, and small group training.', 'Youth Sports, Workshops, Swim Lessons, Summer Camps, Training', '1 - 24yrs'),
('19803', 'Siegel JCC', 'Provides early childhood education, youth and teen programs, summer camps, and recreational facilities.', 'Early Childhood Education, Youth Programs, Summer Camps, Recreation', '2mos - 17yrs'),
('19805', 'West End Neighborhood House', 'Offers youth development programs focusing on education, recreation, and life skills for ages 5–18.', 'Youth Development, Education, Recreation, Life Skills', '5 - 18yrs'),
('19805', 'Out of School Youth Program – West End Neighborhood House', 'An 8-week program integrating employability skills training to prepare youth for the workforce.', 'Employability Skills Training', '16 - 23yrs'),
('19805', 'William "Hicks" Anderson Community Center', 'Provides organized sports leagues, youth camps, field trips, tutoring, and various recreational activities.', 'Sports Leagues, Youth Camps, Field Trips, Tutoring, Recreation', '6 - 17yrs'),
('19806', 'Delaware Center for Horticulture', 'Offers youth programs focusing on horticulture education and employment training.', 'Horticulture Education, Employment Training', '3 - 18yrs'),
('19806', 'Volunteer Opportunities at St. Stephen''s', 'Engages youth in community service through Delaware''s highest-volume pantry, serving over 1,300 families monthly.', 'Community Service', '14 - 18yrs');

