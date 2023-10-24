import { UserRolesType } from "@/libs/interfaces/user.interface";
import User from "@/libs/models/user.model";
import connectDB from "@/libs/mongodb";

export async function getUserByEmail({
  email,
}: {
  email: string | undefined | null;
}) {
  try {
    connectDB();

    const user = await User.findOne({ email });

    if (!user) throw new Error("Email does not exist!");

    return { ...user._doc, _id: user._id.toString() };
  } catch (error: any) {
    throw new Error(`Error getting User by Email: ${error.message}`);
  }
}

export async function authUser({
  email,
  password,
  role = "no role",
}: {
  email: string;
  password: string;
  role?: UserRolesType;
}) {
  try {
    connectDB();

    const user = await User.findOne({ email });

    console.log(user);
    if (!user) {
      console.log("No email found");
      throw new Error("No email found");
    }

    return { ...user._doc, _id: user._id.toString() };
  } catch (error: any) {
    throw new Error(`Error getting User by Email: ${error.message}`);
  }
}
