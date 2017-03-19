module.exports = () => {
  // cipher and decipher
  const crypto = require('crypto');
  const fs = require('fs');

  // process.argv[2] = argument for encypting or decrypting
  // process.argv[3] = key
  // process.argv[4] = filename

  // Get user input
  if(process.argv[2].toLowerCase() === '-e') {
    // If file is provided
    if(process.argv[4]) {
      // Read normal file
      const input = fs.readFileSync(process.argv[4], 'utf8');
      const key = process.argv[3] || '12345';

      // Create a cipher for crypting the file
      const cipher = crypto.createCipher('aes-256-ctr', key);
      let crypted = cipher.update(input, 'utf8', 'hex');
      crypted += cipher.final('hex');

      // Save encrypted file
      fs.writeFile(`encrypted-${process.argv[4]}`, crypted, (err) => {
        if (err) throw err;
        console.log('--File encrypted--');
        // TODO: remove this line for production
        console.log(`Function: ${process.argv[2]}\nKey: ${process.argv[3]}\nFile: ${process.argv[4]}`)
      });
    } else {
      console.log('Please type filename\nexample: node cryptit.js [-e, -d] [key] [filename]');
    }
   
  } else if(process.argv[2].toLowerCase() === '-d') {
    if(!process.argv[3]) throw 'Please enter the key for decrypting the file';
    if(!process.argv[4]) throw 'Please enter filename which you would like to decryp'

    // Read encrypted file
    const file = fs.readFileSync(process.argv[4], 'utf8');

    const key = process.argv[3];
    // Decrypt the file
    const decipher = crypto.createDecipher('aes-256-ctr', key);
    let decrypted = decipher.update(file, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(`---------\nDecrypted: \n${decrypted}`);
  } else {
    // If no argument is provided
    console.log('-e for encryption\n-d for decryption\nAlso you need to provide file')
  }
}