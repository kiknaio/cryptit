// cipher and decipher
const crypto = require('crypto');
const fs = require('fs');

// Get user input
if(process.argv[2].toLowerCase() === 'encrypt') {
  // Read normal file
  const input = fs.readFileSync('text.txt', 'utf8');
  const key = process.argv[3] || '12345';

  // Create a cipher for crypting the file
  const cipher = crypto.createCipher('aes-256-ctr', key);
  let crypted = cipher.update(input, 'utf8', 'hex');
  crypted += cipher.final('hex');

  // Save encrypted file
  fs.writeFile('text.enc', crypted, (err) => {
    if (err) throw err;
    console.log('File is encrypted');
  });
} else if(process.argv[2].toLowerCase() === 'decrypt') {
  if(!process.argv[3]) throw 'Please enter the key for decrypting the file';

  // Read encrypted file
  const file = fs.readFileSync('text.enc', 'utf8');

  const key = process.argv[3];
  // Decrypt the file
  const decipher = crypto.createDecipher('aes-256-ctr', key);
  let decrypted = decipher.update(file, 'hex', 'utf8');
  console.log(decrypted)
  decrypted += decipher.final('utf8');
  console.log(decrypted);
}

