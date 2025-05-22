-- Add address fields to programs table
ALTER TABLE programs ADD COLUMN address TEXT;
ALTER TABLE programs ADD COLUMN city TEXT;
ALTER TABLE programs ADD COLUMN state TEXT;

-- Update existing programs with some sample addresses
UPDATE programs SET 
  address = '123 Main St',
  city = 'Seattle',
  state = 'WA'
WHERE id IN (SELECT id FROM programs LIMIT 3);

UPDATE programs SET 
  address = '456 Park Ave',
  city = 'Seattle',
  state = 'WA'
WHERE id IN (SELECT id FROM programs LIMIT 3 OFFSET 3);

UPDATE programs SET 
  address = '789 Oak Dr',
  city = 'Bellevue',
  state = 'WA'
WHERE id IN (SELECT id FROM programs LIMIT 3 OFFSET 6);

UPDATE programs SET 
  address = '321 Pine St',
  city = 'Redmond',
  state = 'WA'
WHERE id IN (SELECT id FROM programs LIMIT 3 OFFSET 9);

-- Set remaining programs to have addresses based on zip codes
UPDATE programs SET
  address = '100 Center St',
  city = 'Unknown City',
  state = 'WA'
WHERE address IS NULL; 