"use server";

import connectDB from "../mongodb";
import User from "../models/user.model";
import Attendance from "../models/attendance.model";
import Classes from "../models/class.model";
import Student from "../models/student.model";
import { AttendanceType } from "../interfaces/attendance.interface";

export async function fetchAttendanceTeachers({
  pageNumber = 1,
  pageSize = 20,
  currDate,
}: {
  pageNumber?: number;
  pageSize?: number;
  currDate: Date;
}) {
  try {
    connectDB();

    const presentMonth = new Date();
    presentMonth.setHours(0, 0, 0, 0);

    const pastMonth = new Date(currDate);
    pastMonth.setMonth(pastMonth.getMonth() - 1);
    pastMonth.setHours(0, 0, 0, 0);

    const futureMonth = new Date(currDate);
    futureMonth.setMonth(futureMonth.getMonth() + 1);
    futureMonth.setHours(0, 0, 0, 0);
    // Fetch users with pagination
    // find greater than past month but less than the future month
    const query = Attendance.find({
      date: {
        // $eq: presentMonth,
        $gt: pastMonth,
        $lt: futureMonth,
      },
    })
      .sort({ createdAt: "desc" })
      .lean()
      .select("_id date startTime endTime")
      .populate({
        path: "class",
        model: Classes,
        select: "_id class ageGroup",
        populate: {
          path: "participants",
          model: Student,
          select: "_id name profileURL",
        },
      })
      .populate({
        path: "studentsPresent",
        model: Student,
      })
      .exec();

    const totalCount = await User.countDocuments({});
    const data = await query;

    const plainData = data.map((d: any) => {
      
      return {
        ...d,
        _id: d._id?.toString(),
        class: {
          ...d.class,
          _id: d.class._id.toString(),
          participants: d.class.participants.map((d2: any) => {
            return { ...d2, _id: d2._id.toString() };
          }),
        },
        studentsPresent: d.studentsPresent.map((d2: any) => {
          return { ...d2, _id: d2._id.toString() };
        }),
      };
    });

    return { attendance: plainData };
  } catch (error: any) {
    throw new Error("Error in fetching attendance", error.message);
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