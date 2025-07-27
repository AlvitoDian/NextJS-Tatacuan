import { UserUpdatePayload } from "@/types/user";
import {
  createUser,
  getAllUsers,
  findUserByEmail,
  updateUser,
  checkOldPassword,
} from "../models/User";
import { successResponse, errorResponse } from "@/utils/apiResponse";
import { resizeImage } from "@/utils/resizeImage";

export async function fetchAllUsers() {
  try {
    const data = await getAllUsers();
    return successResponse("User fetched successfully", data, 201);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function getUserByEmail(email: string) {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return errorResponse("User tidak ditemukan!", 404);
    }

    return successResponse("user fetched successfully", user, 201);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function registerUser(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return errorResponse("Harap isi email atau password", 400);
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return errorResponse("Email sudah dipakai", 400);
    }

    const newUser = await createUser(email, password);
    return successResponse("User registered successfully", newUser, 201);
  } catch (error) {
    console.error("Error registering user:", error);
    return errorResponse("Internal Server Error", 500, error);
  }
}

export async function updateUserProfile(req: Request, usrid: string) {
  try {
    const payload = (await req.json()) as UserUpdatePayload;

    // RESIZE images
    if (payload.primg) {
      payload.primg = await resizeImage(payload.primg);
    }

    // CHECK - Compare Old Password
    if (payload.newpw) {
      const checkOld = await checkOldPassword(payload);
      if (!checkOld) {
        return errorResponse(
          "Password lama yang Anda masukkan tidak sesuai.",
          500
        );
      }
    }

    // UPDATE - User
    const updatedUser = await updateUser(payload, usrid);
    if (!updatedUser) {
      return errorResponse("User tidak ditemukan", 404);
    }

    return successResponse("User updated successfully", updatedUser, 200);
  } catch (error) {
    console.error("Error:", error);
    return errorResponse(error.message, 500, error);
  }
}
