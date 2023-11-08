"use server";

import connectDB from "../mongodb";
import { revalidatePath } from "next/cache";
import {
  TransactionStatusType,
  TransactionType,
  TransactionsType,
} from "../interfaces/transaction.interface";
import Transaction from "../models/transaction.model";
import Classes from "../models/class.model";
import { ClassesType } from "../interfaces/class.interface";
import { DurationType } from "../interfaces/duration.interface";
import Parent from "../models/parent.model";
import Student from "../models/student.model";
import { ParentType } from "../interfaces/parent.interface";


interface Params {
  newTransaction: TransactionType;
  path: string;
  customer_id: string;
}

export async function createNewTransaction({
  newTransaction,
  path,
  customer_id,
}: Params) {
  try {
    connectDB();

    const selectedClass = await Classes.findById({ _id: newTransaction.class });

    const createdTransaction = await Transaction.create({
      ...newTransaction,
      $push: { class: selectedClass._id },
    });

    // Update customer model
    // await Customer.findByIdAndUpdate(customer_id, {
    //   $push: { transactions: createdTransaction._id },
    // });

    revalidatePath(path);
    return {
      message: "Successfully Created New Transaction",
      data: createdTransaction,
    };
  } catch (error: any) {
    throw new Error(`Error creating new transaction: ${error.message}`);
  }
}

interface ParamsSingleTransaction {
  newData: {
    price: number;
    duration: DurationType;
    status: TransactionStatusType;
  };
  path: string;
  parentId: string;
  classId: string;
  studentId: string;
}
export async function createNewSingleTransaction({
  newData,
  path,
  parentId,
  classId,
  studentId,
}: ParamsSingleTransaction) {
  try {
    connectDB();
    console.log({
      newData,
      path,
      parentId,
      classId,
      studentId,
    });
    // const selectedClass = await Classes.findById(classId);

    const createdTransaction = await Transaction.create({
      price: newData.price,
      duration: newData.duration,
      status: newData.status,
    });

    // Update parent model
    await Parent.findByIdAndUpdate(parentId, {
      $push: { transactions: createdTransaction._id },
    });

    // Update transaction model
    await Transaction.findByIdAndUpdate(createdTransaction._id, {
      $push: { class: classId, student: studentId },
    });

    revalidatePath(path);
    return {
      message: "Successfully Created New Transaction",
      data: createdTransaction,
    };
  } catch (error: any) {
    throw new Error(`Error creating new transaction: ${error.message}`);
  }
}

export async function fetchTransactions(
  pageNumber = 1,
  pageSize = 20,
  statusFilter = "All"
) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const filter = statusFilter === "All" ? {} : { status: statusFilter };
    const query = Transaction.find(filter)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select("_id price duration status paidDate expiryDate")
      .populate({ path: "student", model: Student, select: "_id name age" })
      .populate({
        path: "class",
        model: Classes,
        select: "_id ageGroup classDate class",
      })
      .populate({
        path: "student",
        populate: {
          path: "parent",
          model: Parent,
          select: "_id name email",
        },
        model: Student,
      })
      .exec();

    const totalCount = await Transaction.countDocuments(filter);
    const transactions = await query;

    // // Convert _id to string in the results
    const arrToIdString: TransactionsType[] = transactions.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      class: { ...d.class, _id: d.class._id.toString() },
      student: {
        ...d.student,
        _id: d.student._id.toString(),
        parent: {
          ...d.student.parent,
          _id: d.student.parent._id.toString(),
        },
      },
    }));

    console.log(arrToIdString);

    const isNext = totalCount > skipAmount + transactions.length;

    return { transactions: arrToIdString, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching transactions", error.message);
  }
}

export async function updateTransactionStatusById({
  _id,
  newStatus,
  classes,
  duration,
  studentId,
  classId,
}: {
  _id: string;
  newStatus: TransactionStatusType;
  classes: ClassesType;
  duration: DurationType;
  studentId: string;
  classId: string;
}) {
  try {
    connectDB();
    const match = duration.match(/\d+/);
    const durationFormatted = match ? parseInt(match[0], 10) : null;
    const paidDate = newStatus === "Paid" ? new Date() : null;
    let expiryDate = null;

    if (paidDate && durationFormatted !== null) {
      expiryDate = new Date(paidDate);
      expiryDate.setMonth(expiryDate.getMonth() + durationFormatted);
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id },
      { status: newStatus, paidDate, expiryDate },
      { new: true }
    )
      .select("_id")
      .populate({ path: "student", model: Student })
      .exec();

    if (!updatedTransaction) {
      console.log("No Transaction Found");
      throw new Error("No Transaction Found");
    }

    const typeOfPaidClassEnrolled =
      newStatus === "Paid"
        ? {
            status: newStatus,
            enrolledClass: classId,
            classExpiryDate: expiryDate,
          }
        : {
            status: newStatus,
            enrolledClass: null,
            classExpiryDate: expiryDate,
          };

    const paidCustomer = await Student.findByIdAndUpdate(
      studentId,
      typeOfPaidClassEnrolled
    );

    const typeOfPaid =
      newStatus === "Paid"
        ? {
            $push: { participants: paidCustomer._id },
          }
        : {
            $pull: { participants: paidCustomer._id },
          };

    await Classes.findByIdAndUpdate(classId, typeOfPaid);

    return { message: "Successfully in Updated Transaction Status" };
  } catch (error: any) {
    throw new Error("Error in updating transactions status", error.message);
  }
}

