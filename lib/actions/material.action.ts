"use server";

import connectDB from "../mongodb";
import { MaterialType } from "../interfaces/material.interface";
import Material from "../models/material.model";
import { AttendanceType } from "../interfaces/attendance.interface";
import Attendance from "../models/attendance.model";

export async function addMaterial(newMaterialData: MaterialType) {
    try {
      connectDB();
      const createdMaterial = await Material.create({ ...newMaterialData });
      console.log(createdMaterial);
      const attendance = await Attendance.findById(newMaterialData.attendance);

    if (!attendance) {
      throw new Error(`Attendance document not found for the given attendance ID`);
    }

    attendance.materials.push(createdMaterial);

    await attendance.save();
      return {
        message: "Successfully Created New Material",
      };
    } catch (error: any) {
      
      throw new Error(`Error creating new material: ${error.message}`);
    }
  }

export async function fetchMaterialsByAttendanceId(attendance: AttendanceType) {
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

export async function deleteMaterial(materialId: string) {
  connectDB();

  try {
    const material = await Material.findById(materialId);

    if (!material) {
      console.log("No Material Found");
      throw new Error("No Material Found");
    }
    const attendanceRecords = await Attendance.find({ materials: materialId });

    const deletedMaterial = await Material.findByIdAndDelete(materialId);

    if (!deletedMaterial) {
      console.log("Material Not Deleted");
      throw new Error("Material Not Deleted");
    }

    for (const attendance of attendanceRecords) {
      attendance.materials = attendance.materials.filter(
        (material: { toString: () => string; }) => material.toString() !== materialId
      );
      await attendance.save();
    }
    
    return { message: "Material deleted successfully" };
  } catch (error: any) {
    throw new Error(`Failed to delete material: ${error.message}`);
  }
}