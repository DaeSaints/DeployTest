"use server";

import connectDB from "../mongodb";
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

export async function fetchUsersSearch(search: string) {
  try {
    connectDB();

    // Fetch users with pagination
    const usersQuery = User.find({ email: { $regex: search, $options: "i" } })
      .sort({ createdAt: "desc" })
      .lean()
      .limit(2)
      .select("_id name email image role")
      .exec();

    const usersData = await usersQuery;

    // PARENTS
    const parentsQuery = Parent.find({
      email: { $regex: search, $options: "i" },
    })
      .sort({ createdAt: "desc" })
      .lean()
      .limit(2)
      .select("_id name email")
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

    return { users: combinedData };
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

    return single;
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
}: {
  _id: string;
  profileURL: string;
}) {
  connectDB();

  try {
    const user = await User.findByIdAndUpdate(
      { _id },
      { profileURL },
      { new: true }
    );

    if (!user) {
      console.log("No User Found");
      throw new Error("No User Found");
    }

    return { message: "Update Profile Successfully", data: user };
  } catch (error: any) {
    throw new Error(`Failed to Update Profile: ${error.message}`);
  }
}