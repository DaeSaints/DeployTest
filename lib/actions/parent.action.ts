"use server";

import connectDB from "../mongodb";
import Parent from "../models/parent.model";
import Student from "../models/student.model";
import Classes from "../models/class.model";

export async function fetchSingleParentId({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = Parent.findById({ _id })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id name email profileURL")
      .populate({
        path: "children",
        model: Student,
        select: "_id name age status profileURL",
        populate: {
          path: "enrolledClass",
          model: Classes,
          select: "class",
        },
      })
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Parent not Found");
    }

    const plainData = {
      ...single,
      _id: single._id.toString(),
      children: single.children.map((child: any) => {
        return { ...child, _id: child._id.toString() };
      }),
    };

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Parent`);
  }
}

export async function fetchChildrenId({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = Parent.findById({ _id })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id")
      .populate({
        path: "children",
        model: Student,
        select: "_id name age status profileURL",
        populate: {
          path: "enrolledClass",
          model: Classes,
          select: "class",
        },
      })
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Parent not Found");
    }

    const plainData = {
      ...single,
      _id: single._id.toString(),
      children: single.children.map((child: any) => {
        return { ...child, _id: child._id.toString() };
      }),
    };

    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Parent`);
  }
}
