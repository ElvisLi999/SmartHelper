// Server/Services/index.ts

import User from '../Models/user';

// get all users from the database
export async function listUsers(): Promise<UserDocument[]> {
  try {
    const users = await User.find();
    return users; 
  } catch (error) {
    throw error; 
  }
}

// get user by id
export async function getUserById(userId: string): Promise<UserDocument | null> {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error) {
      throw error; 
    }
  }

  // update user role by id
  export async function updateUserRole(userId: string, role: string): Promise<UserDocument> {
    try {
      const user = await User.findById(userId);
      if (user) {
        user.role = role;
        await user.save();
        return user;
      }
      throw new Error('User not found');
    } catch (error) {
      throw error;
    }
  }
  
  // update user status by id
  export async function toggleUserStatus(userId: string, isActive: boolean): Promise<UserDocument> {
    try {
      const user = await User.findById(userId);
      if (user) {
        user.isActive = isActive;
        await user.save();
        return user;
      }
      throw new Error('User not found');
    } catch (error) {
      throw error;
    }
  }
  

