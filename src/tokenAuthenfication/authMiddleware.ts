import { Request, Response, NextFunction } from 'express';
import { AES } from 'crypto-js';
import supabaseDB from '../supabase/supabaseClient';
import randomstring from 'randomstring';

class AuthMiddleware {
  public generateAPIKey(): string {
    const apiKey: string = randomstring.generate({
      length: 32,
      charset: 'hex',
    });
  
    if (!process.env.API_KEY_SECRET) {
      throw new Error('API key secret is not defined');
    }
  
    const encryptedAPIKey: string = AES.encrypt(
      apiKey,
      process.env.API_KEY_SECRET
    ).toString();

    return encryptedAPIKey;
  }

  public async checkAPIKey(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const apiKey: string | undefined = req.headers['x-api-key'] as string;

    if (!apiKey) {
      res.status(401).json({
        message: 'API key is missing',
      });
    } else {
      const { data: apiKeyData, error } = await supabaseDB.supabase
        .from('employees')
        .select('*')
        .eq('api_key', apiKey);

      if (error) {
        res.status(500).json({
          message: 'Internal server error',
        });
      } else if (apiKeyData.length === 0) {
        res.status(401).json({
          message: 'API key is invalid',
        });
      } else {
        return next();
      }
    }
  }
}


export default new AuthMiddleware();
