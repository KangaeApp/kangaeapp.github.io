import * as fs from 'fs';

// File destination.txt will be created or overwritten by default.
fs.copyFile('CNAME', 'docs/CNAME', (err) => {
  if (err) throw err;
  console.log('CNAME was copied to docs/CNAME');
});