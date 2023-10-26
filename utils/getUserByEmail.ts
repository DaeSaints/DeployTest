import { UserRolesType } from "@/lib/interfaces/user.interface";
import Parent from "@/lib/models/parent.model";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongodb";

export async function getUserByEmail({
  email,
}: {
  email: string | undefined | null;
}) {
  try {
    connectDB();


    const user = await User.findOne({ email });
    const userparent = await Parent.findOne({email});
    console.log(user);
    console.log(userparent);

    if (!user && !userparent) {
      console.log("No email found");
      throw new Error("Email does not exist!")
    } else if(!user || userparent) {
      console.log("User is parent");
      return { ...userparent._doc, _id: userparent._id.toString() };
    } else { 
      console.log("User is not parent");
      return { ...user._doc, _id: user._id.toString() };
    }
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
    const userparent = await Parent.findOne({email});
    console.log(user);
    console.log(userparent);

    if (!user && !userparent) {
      console.log("No email found");
      throw new Error("Email does not exist!")
    } else if(!user || userparent) {
      console.log("User is parent");
      return { ...userparent._doc, _id: userparent._id.toString() };
    } else { 
      console.log("User is not parent");
      return { ...user._doc, _id: user._id.toString() };
    }

    
  } catch (error: any) {
    throw new Error(`Error getting User by Email: ${error.message}`);
  }
}
