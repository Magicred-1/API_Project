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
        error: 401,
        message: 'API key is missing',
      });
    } else {
      const { data: apiKeyData, error } = await supabaseDB.supabase
        .from('employees')
        .select('api_key')
        .eq('api_key', apiKey)
        .single();

      if (error) {
        res.status(500).json({
          error: 500,
          message: 'Internal server error',
        });
      } else if (apiKeyData.length === 0) {
        res.status(401).json({
          error: 401,
          message: 'API key cannot be found or is invalid',
        });
      } else {
        return next();
      }
    }
  }

  public async getAPIKeyByEmployeeName(name: string): Promise<string> {
    try {
      const { data: employees, error } = await supabaseDB.supabase
        .from('employees')
        .select('api_key')
        .eq('name', name)
        .single();
      if (error) {
        console.error(error);
        return Promise.reject(error);
      } else {
        return Promise.resolve(employees.api_key);
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
}

export default new AuthMiddleware();
