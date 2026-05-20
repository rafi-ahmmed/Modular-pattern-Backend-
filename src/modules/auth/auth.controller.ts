import type { Request, Response } from 'express';
import { authService } from './auth.service.js';
import sendResponse from '../../utility/sendResponse.js';


const loginUser = async (req: Request, res: Response) => {
   try {
      const result = await authService.loginUserIntoDB(req.body);

      //? Set refresh token in httpOnlyCookie
      res.cookie('refreshToken', result.refreshToken, {
         httpOnly: true,
         secure: false,
         sameSite: 'lax',
      });

      sendResponse(res, {
         success: true,
         statusCode: 200,
         message: 'Login successfully',
         data: { accessToken: result.accessToken },
      });
   } catch (error: any) {
      sendResponse(res, {
         success: false,
         statusCode: 500,
         message: error.message,
         error: error,
      });
   }
};

const refreshToken = async (req: Request, res: Response) => {
   try {
      const result = await authService.generateAccessToken(
         req.cookies.refreshToken
      );

      sendResponse(res, {
         success: true,
         statusCode: 201,
         message: 'Access token generated successfully',
         data: result,
      });
   } catch (error: any) {
      sendResponse(res, {
         success: false,
         statusCode: 500,
         message: error.message,
         error: error,
      });
   }
};

export const authController = {
   loginUser,
   refreshToken,
};
