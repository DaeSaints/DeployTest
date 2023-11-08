"use server";

import connectDB from "../mongodb";
import Parent from "../models/parent.model";
import Student from "../models/student.model";
import Classes from "../models/class.model";
import Transaction from "../models/transaction.model";

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

export async function fetchTransactionId({ _id }: { _id: string }) {
  try {
    connectDB();

    const query = Parent.findById({ _id })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id")
      .populate({
        path: "transactions",
        model: Transaction,
        select: "_id price duration status paidDate expiryDate",
        populate: [
          {
            path: "class",
            model: Classes,
            select: "_id class",
          },
          {
            path: "student",
            model: Student, 
            select: "_id name age", 
          },
        ],
      })
      .exec();

    const single: any = await query;

    if (!single) {
      throw new Error("Parent not Found");
    }

    const plainData = {
      transactions: single.transactions.map((transaction: any) => {
        return {...transaction,
          _id: transaction._id.toString(),
          class: {
            ...transaction.class,
            _id: transaction.class._id.toString(),
          }, };
      }),
    };


    return plainData;
  } catch (error) {
    throw new Error(`Error in fetching single Parent`);
  }
}
