import type { Request, Response } from 'express';
import { profileService } from './profile.service';

const createProfile = async (req: Request, res: Response) => {
   try {
      const result = await profileService.createProfileInDB(req.body);
      res.status(201).json({
         success: true,
         message: 'Profile created successfull!',
         data: result.rows[0],
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
         error: error,
      });
   }
};

const getAllProfiles = async (req: Request, res: Response) => {
   try {
      const result = await profileService.getAllProfileFromDB();
      return res.status(200).json({
         success: true,
         profiles: result,
      });
   } catch (error: any) {
      return res.status(500).json({
         success: false,
         message: error.message,
         error: error,
      });
   }
};

const getProfile = async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
      const result = await profileService.getSingleProfileFromDB(id as string);
      return res.status(200).json({
         success: true,
         profile: result,
      });
   } catch (error: any) {
      return res.status(500).json({
         success: false,
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
      return res.status(200).json({
         success: true,
         message: 'Your Profile updated successfully!',
         profile: result,
      });
   } catch (error: any) {
      return res.status(500).json({
         success: false,
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
