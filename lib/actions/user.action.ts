"use server";

import connectDB from "../mongodb";
import bcrypt from "bcrypt";
import { UserRolesType, UserType } from "../interfaces/user.interface";
import User from "../models/user.model";
import Parent from "../models/parent.model";
import { ParentType } from "../interfaces/parent.interface";

export async function fetchUsers(pageNumber = 1, pageSize = 20) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const query = User.find({})
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select("_id name email image role")
      .exec();

    const totalCount = await User.countDocuments({});
    const data = await query;

    const plainData: UserType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    const isNext = totalCount > skipAmount + plainData.length;

    return { users: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching users", error.message);
  }
}

export async function fetchUsersSearch(
  search: string,
  userId: string,
  role: string
) {
  try {
    connectDB();

    const filter =
      role === "All"
        ? {
            email: { $regex: search, $options: "i" },
            _id: { $ne: userId },
            role: { $in: ["general manager", "teacher"] },
          }
        : {
            email: { $regex: search, $options: "i" },
            _id: { $ne: userId },
            role,
          };

    // Fetch users with pagination
    const usersQuery = User.find(filter)
      .sort({ createdAt: "desc" })
      .lean()
      .limit(4)
      .select("_id name email photoURL role")
      .exec();

    const usersData = await usersQuery;

    // if(role === "Parent")

    // PARENTS
    const parentsQuery = Parent.find({
      email: { $regex: search, $options: "i" },
      _id: { $ne: userId },
    })
      .sort({ createdAt: "desc" })
      .lean()
      .limit(2)
      .select("_id name email photoURL")
      .exec();

    const parentsData = await parentsQuery;

    const usersPlainData: UserType[] = usersData.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    const parentsPlainData: ParentType[] = parentsData.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    const combinedData = [...usersPlainData, ...parentsPlainData];

    return { users: usersPlainData };
  } catch (error: any) {
    throw new Error("Error in fetching users", error.message);
  }
}

export async function fetchSingleUserById({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = User.findById({ _id })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id name email profileURL role")
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("User not Found");
    }

    const plainData = { ...single, _id: single._id.toString() };

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single user`);
  }
}

export async function updateUserRoleByID({
  _id,
  newRole,
}: {
  _id: string;
  newRole: UserRolesType;
}) {
  connectDB();

  try {
    const user = await User.findByIdAndUpdate(
      { _id },
      { role: newRole },
      { new: true }
    );

    if (!user) {
      console.log("No User Found");
      throw new Error("No User Found");
    }

    return { message: "Update Role Successfully", data: user };
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function addProfilePicture({
  _id,
  profileURL,
  name,
  password,
}: {
  _id: string;
  profileURL: string;
  name: string;
  password: string;
}) {
  connectDB();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const parent = await Parent.findById(_id);

    if (!parent) {
      console.log("No Parent Found");
      throw new Error("No Parent Found");
    }

    parent.profileURL = profileURL;
    parent.name = name;
    parent.password = hashedPassword;

    const updatedParent = await parent.save();

    return { message: "Update Profile Successfully", data: updatedParent };
  } catch (error: any) {
    throw new Error(`Failed to Update Profile: ${error.message}`);
  }
}
