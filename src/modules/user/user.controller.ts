import type { Request, Response } from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
   // console.log(req.body);
   // const { name, email, age, password } = req.body;

   try {
      const result = await userService.createUserIntoDB(req.body);
      // console.log(result.rows[0]);
      res.status(201).json({
         message: 'User  created Successfully!',
         data: result.rows[0],
      });
   } catch (error: any) {
      res.status(500).json({
         message: error.message,
         error: error,
      });
   }
};

const getAllUsers = async (req: Request, res: Response) => {
   try {
      const result = await userService.getAllUsersFromDB();
      res.status(200).json({
         success: true,
         message: 'User retrieved successfully',
         data: result.rows,
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
         error: error,
      });
   }
};

const getSingleUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
      const result = await userService.getSingleUserFromDB(id as string);

      if (result.rows.length === 0) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            data: {},
         });
      }

      res.status(200).json({
         success: true,
         message: 'User retrieved successfully',
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

const updateUser = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const result = await userService.updateUserIntoDB(req.body, id as string);
      if (result.rows.length === 0) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            data: {},
         });
      }

      // console.log(result);
      res.status(200).json({
         success: true,
         message: 'User Updated Successfully',
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

const deleteUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
      const result = await userService.deleteUserFromDB(id as string);

      if (result.rowCount === 0) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            data: {},
         });
      }

      res.status(200).json({
         success: true,
         message: 'User deleted Successfully',
      });
   } catch (error: any) {
      res.status(500).json({
         success: false,
         message: error.message,
         error: error,
      });
   }
};

export const userController = {
   createUser,
   getAllUsers,
   getSingleUser,
   updateUser,
   deleteUser,
};
