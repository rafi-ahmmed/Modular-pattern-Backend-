import type { Request, Response } from 'express';
import { profileService } from './profile.service.js';
import sendResponse from '../../utility/sendResponse.js';

const createProfile = async (req: Request, res: Response) => {
   try {
      const result = await profileService.createProfileInDB(req.body);
      sendResponse(res, {
         success: true,
         statusCode: 210,
         message: 'Profile created successful!',
         data: result.rows[0],
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

const getAllProfiles = async (req: Request, res: Response) => {
   try {
      const result = await profileService.getAllProfileFromDB();
      sendResponse(res, {
         success: true,
         statusCode: 200,
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

const getProfile = async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
      const result = await profileService.getSingleProfileFromDB(id as string);
      sendResponse(res, {
         success: true,
         statusCode: 200,
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

const updateProfile = async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
      const result = await profileService.updateProfileIntoDB(
         req.body,
         id as string
      );
      sendResponse(res, {
         success: true,
         statusCode: 200,
         message: 'Your Profile updated successfully!',
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

export const profileController = {
   createProfile,
   getAllProfiles,
   getProfile,
   updateProfile,
};
