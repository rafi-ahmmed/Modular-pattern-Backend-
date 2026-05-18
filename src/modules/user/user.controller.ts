import type { Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utility/sendResponse';

const createUser = async (req: Request, res: Response) => {
   // console.log(req.body);
   // const { name, email, age, password } = req.body;

   try {
      const result = await userService.createUserIntoDB(req.body);
      sendResponse(res, {
         message: 'User created successful',
         statusCode: 201,
         success: true,
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

const getAllUsers = async (req: Request, res: Response) => {
   console.log('controller', req.user);
   try {
      const result = await userService.getAllUsersFromDB();
      sendResponse(res, {
         success: true,
         statusCode: 200,
         message: 'User retrieved successfully',
         data: result.rows,
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

      sendResponse(res, {
         success: true,
         statusCode: 200,
         message: 'User retrieved successfully',
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

const updateUser = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      const result = await userService.updateUserIntoDB(req.body, id as string);
      if (result.rows.length === 0) {
         sendResponse(res, {
            success: false,
            statusCode: 404,
            message: 'User not found',
            data: {},
         });
      }

      sendResponse(res, {
         success: true,
         statusCode: 200,
         message: 'User Updated Successfully',
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

const deleteUser = async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
      const result = await userService.deleteUserFromDB(id as string);

      if (result.rowCount === 0) {
         sendResponse(res, {
            success: false,
            statusCode: 404,
            message: 'User not found',
            data: {},
         });
      }
      sendResponse(res, {
         success: true,
         statusCode: 200,
         message: 'User deleted Successfully',
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

export const userController = {
   createUser,
   getAllUsers,
   getSingleUser,
   updateUser,
   deleteUser,
};
