"use server";

import { AttendanceType } from "../interfaces/attendance.interface";
import { ClassesType } from "../interfaces/class.interface";
import { StudentType } from "../interfaces/student.interface";
import Attendance from "../models/attendance.model";
import Classes from "../models/class.model";
import Material from "../models/material.model";
import Student from "../models/student.model";
import connectDB from "../mongodb";

export async function fetchAttendances({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  try {
    connectDB();

    // const skipAmount = (pageNumber - 1) * pageSize;

    const startDate = new Date(year, month - 1, 1); // Note: Month is 0-indexed
    const endDate = new Date(year, month + 1, 1); // This gives the first day of the next month
    endDate.setMilliseconds(endDate.getMilliseconds() - 1); // Subtract one millisecond to get the last millisecond of the last day

    console.log(startDate, endDate);

    const query = Attendance.find({
      date: { $gte: startDate, $lte: endDate }, // Filter by date within the specified month
    })
      .sort({ date: "asc" })
      // .limit(pageSize)
      .lean()
      .select(
        "_id startTime endTime date isClassCancelled classAttendanceType classAttendanceStatus"
      )
      .populate({
        path: "class",
        model: Classes,
        select: "_id class zoomLink ageGroup",
        populate: {
          path: "participants",
          model: Student,
          select: "_id name",
        },
      })
      .populate({
        path: "studentsPresent",
        model: Student,
        select: "_id name age",
      })
      .populate({
        path: "studentsNotPresent",
        model: Student,
        select: "_id name age",
      })
      .populate({
        path: "specialClassParticipants",
        model: Student,
        select: "_id name age",
      })
      .populate({
        path: "materials",
        model: Material,
        select: "_id name",
      })
      .exec();

    const totalCount = await Attendance.countDocuments({});
    const data = await query;

    console.log(data);

    // Convert _id to string in the results
    const arrToIdString: AttendanceType[] = data.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      class: {
        ...d.class,
        _id: d._id.toString(),
      },
    }));
    return { attendances: arrToIdString, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchFilterAttendances({
  pageNumber,
  pageSize,
  filter,
}: {
  pageNumber: number;
  pageSize: number;
  filter: string;
}) {
  try {
    connectDB();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const skipAmount = (pageNumber - 1) * pageSize;

    let dateFilter = {};

    if (filter === "today") {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);

      filter = "ongoing";
      dateFilter = { date: { $gte: now, $lt: tomorrow } };
    } else if (filter === "upcoming") {
      filter = "ongoing";
      const today = new Date();
      dateFilter = { date: { $gt: today } };
    } else if (filter === "past") {
      filter = "ongoing";
      dateFilter = { date: { $lt: now } };
    }

    const query = Attendance.find({
      classAttendanceStatus: filter,
      ...dateFilter,
    })
      .sort({ date: "asc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select(
        "_id startTime endTime date isClassCancelled classAttendanceType classAttendanceStatus"
      )
      .populate({
        path: "class",
        model: Classes,
        select: "_id class zoomLink ageGroup",
        populate: {
          path: "participants",
          model: Student,
          select: "_id name",
        },
      })
      .populate({ path: "studentsPresent", model: Student, select: "_id name" })
      .populate({
        path: "studentsNotPresent",
        model: Student,
        select: "_id name",
      })
      .populate({
        path: "specialClassParticipants",
        model: Student,
        select: "_id name",
      })
      .populate({
        path: "materials",
        model: Material,
        select: "_id",
      })
      .exec();

    const data = await query;
    const arrToIdString: AttendanceType[] = data.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      class: {
        ...d.class,
        _id: d._id.toString(),
      },
    }));

    return { attendances: arrToIdString };
  } catch (error: any) {
    throw new Error("Error in fetching pending attendances", error.message);
  }
}

export async function fetchMateriaByAttendanceId(attendance: AttendanceType) {
  try {
    connectDB();

    const query = Material.find({ attendance: attendance })
      .sort({ addedDate: "desc" })
      .lean()
      .select("_id filename materials classDate addedDate type")
      .exec();

    const materials = await query;

    return materials;
  } catch (error) {
    throw new Error(`Error in fetching materials by attendance ID`);
  }
}

export async function fetchParticipants(students: StudentType[]) {
  try {
    connectDB();

    const studentss = await Student.find({ _id: { $in: students } }, "_id name age participants")
      .exec();

    return studentss;
  } catch (error) {
    throw new Error("Error in fetching participants by attendance ID");
  }
}

export async function updateStudentYes({
  studentId,
  attendanceId,
}: {
  studentId: string;
  attendanceId: string;
}) {
  try {
    connectDB();

    const newData = await Attendance.findByIdAndUpdate(attendanceId, {
      $push: { studentsPresent: studentId },
    });

    if (!newData) {
      console.log("No Attendance Found");
      throw new Error("No Attendance Found");
    }

    return { message: "Student Confirmed Successfully", data: newData };
  } catch (error: any) {
    throw new Error("Error in updating student attendance", error.message);
  }
}

export async function updateStudentNo({
  studentId,
  attendanceId,
}: {
  studentId: string;
  attendanceId: string;
}) {
  try {
    connectDB();

    const newData = await Attendance.findByIdAndUpdate(attendanceId, {
      $pull: { studentsPresent: studentId },
    });

    if (!newData) {
      console.log("No Attendance Found");
      throw new Error("No Attendance Found");
    }

    return { message: "Student Confirmed Successfully", data: newData };
  } catch (error: any) {
    throw new Error("Error in updating student attendance", error.message);
  }
}

export async function updateAttendance ({
  studentId,
  attendanceId,
  isPresent,
}: {
  studentId: string;
  attendanceId: string;
  isPresent:boolean;
}) {
  try {
    connectDB();
    let newData;
    if(isPresent){
      newData = await Attendance.findByIdAndUpdate(attendanceId, {
        $push: { studentsPresent: studentId },
        
      });
    }
    else{
      newData = await Attendance.findByIdAndUpdate(attendanceId, {
        $pull: { studentsPresent: studentId },
      });
    }
    

    if (!newData) {
      console.log("No Attendance Found");
      throw new Error("No Attendance Found");
    }

    return { message: "Student Confirmed Successfully", data: newData };
  } catch (error: any) {
    throw new Error("Error in updating student attendance", error.message);
  }
}