import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// script use a callback implementation and be converted to a promise implementation
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string){
    //generate a random text 
    const salt = randomBytes(8).toString('hex');
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string){
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}