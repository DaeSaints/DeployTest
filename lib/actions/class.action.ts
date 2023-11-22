"use server";

import connectDB from "../mongodb";
import Classes from "../models/class.model";
import { ClassesType } from "../interfaces/class.interface";
import Student from "../models/student.model";
import Parent from "../models/parent.model";
import { StudentType } from "../interfaces/student.interface";

function getGradeLevel(age: number) {
  let level = [];
  if (age >= 2 && age <= 3) level.push("N1");
  if (age >= 3 && age <= 4) level.push("N2");
  if (age >= 4 && age <= 5) level.push("K1");
  if (age >= 5 && age <= 6) level.push("K2");
  return level;
}

export async function fetchAllClasses(
  pageNumber = 1,
  pageSize = 10,
  search = "",
  levelFilter = "all"
) {
  try {
    connectDB();

    // const filter = levelFilter === "all" ? {} : { ageGroup: levelFilter };
    const filter =
      search !== ""
        ? levelFilter === "all"
          ? { class: new RegExp(search, "i") }
          : { ageGroup: levelFilter, class: new RegExp(search, "i") }
        : levelFilter === "all"
        ? {}
        : { ageGroup: levelFilter };

    const skipAmount = (pageNumber - 1) * pageSize;
    const findQuery = search !== "" ? { class: new RegExp(search, "i") } : {}; // Case-insensitive search
    // fetch Top Level threads
    const postQuery = Classes.find(filter)
      .sort({
        createdAt: "desc",
      })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select(
        "_id class zoomLink price ageGroup classDate startTime endTime repeatedDays"
      )
      .populate({
        path: "participants",
        model: Student,
        select: "_id name age",
        populate: {
          path: "parent",
          model: Parent,
          select: "_id name email phone",
        },
      })
      .exec();

    const totalCount = await Classes.countDocuments(filter);
    const data = await postQuery;

    const plainData: ClassesType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        participants: d.participants?.map((participant: any) => {
          return {
            ...participant,
            _id: participant._id?.toString(),
            parent: {
              ...participant.parent,
              _id: participant.parent._id?.toString(),
            },
          };
        }),
      };
    });
    const isNext = totalCount > skipAmount + data.length;

    return { classes: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching customers", error.message);
  }
}

export async function fetchSingleClassByID({ _id }: { _id: string }) {
  try {
    connectDB();

    const postQuery = Classes.findById(_id)
      .sort({
        createdAt: "desc",
      })
      .select(
        "_id class zoomLink price ageGroup classDate startTime endTime repeatedDays"
      )
      .populate({
        path: "participants",
        model: Student,
        select: "_id name age profileURL classExpiryDate",
        populate: [
          {
            path: "parent",
            model: Parent,
            select: "_id name email",
          },
        ],
      })
      .lean()
      .exec();

    const d: any = await postQuery;

    const plainData: any = {
      ...d,
      _id: d._id?.toString(),
      participants: d.participants?.map((participant: any) => {
        return {
          ...participant,
          _id: participant._id?.toString(),
          parent: {
            ...participant.parent,
            _id: participant.parent._id?.toString(),
          },
        };
      }),
    };

    return plainData as ClassesType;
  } catch (error: any) {
    throw new Error("Error in fetching single class", error.message);
  }
}

export async function fetchAllClassesSelection(gradeLevel: string[]) {
  try {
    connectDB();

    const postQuery = Classes.find({ ageGroup: { $in: gradeLevel } })
      .sort({
        createdAt: "desc",
      })
      .lean()
      .select("_id class ageGroup")
      // .populate({
      //   path: "participants",
      //   model: Student,
      //   select: "_id name",
      // })
      .exec();

    const data = await postQuery;

    const plainData: ClassesType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    return { classes: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching customers", error.message);
  }
}

export async function fetchForYouClasses(childId: string) {
  try {
    connectDB();

    const selectedStudent: StudentType = (await Student.findById(childId)
      .lean()
      .select("_id age")
      .exec()) as StudentType;

    const gradeLevel: string[] = getGradeLevel(selectedStudent?.age as number);

    console.log(gradeLevel);

    const postQuery = Classes.find({ ageGroup: { $in: gradeLevel } })
      .sort({
        createdAt: "desc",
      })
      .lean()
      .select("_id class repeatedDays image")
      // .populate({
      //   path: "participants",
      //   model: Student,
      //   select: "_id name",
      // })
      .exec();

    const data = await postQuery;

    const plainData: ClassesType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
      };
    });

    return { classes: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching customers", error.message);
  }
}

export async function searchClass(searchQuery: string) {
  try {
    connectDB();

    const query = Classes.find({
      class: { $regex: new RegExp(searchQuery, "i") },
    })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id class ageGroup zoomLink")
      // .populate({ path: "enrolledClass", model: Classes, select: "_id class" })
      .exec();

    const data = await query;

    // Convert _id to string in the results
    const arrToIdString: any[] = data.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      // enrolledClass: {
      //   ...d.enrolledClass,
      //   _id: d.enrolledClass._id.toString(),
      // },
    }));

    return arrToIdString;
  } catch (error: any) {
    throw new Error("Error in fetching classes", error.message);
  }
}
