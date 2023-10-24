"use server";

// import { revalidatePath } from "next/cache";
import connectDB from "../mongodb";
import Chat from "../models/chat/chat.model";
import User from "../models/user.model";
import Message from "../models/chat/message.model";
import Parent from "../models/parent.model";
import { ChatType } from "../interfaces/chat.interface";

export async function fetchChats({
  pageNumber,
  pageSize,
  userId,
}: {
  pageNumber: number;
  pageSize: number;
  userId: string;
}) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch users with pagination
    const data = await Chat.find({ users: { $in: userId } })
      .sort({ updatedAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .select("_id users")
      .populate({
        path: "latestMessage",
        model: Message,
        select: "_id content isRead sender createdAt",
      })
      .lean()
      .exec();

    const totalCount = await User.countDocuments({});

    for (let chat of data) {
      for (let i = 0; i < chat.users.length; i++) {
        let user = await User.findById(chat.users[i])
          .select("_id name email role")
          .lean();
        if (!user)
          user = await Parent.findById(chat.users[i])
            .select("_id name email")
            .lean();
        chat.users[i] = user;
      }
    }

    for (let chat of data) {
      let user = await User.findById(chat.latestMessage.sender)
        .select("_id name email role")
        .lean();
      if (!user)
        user = await Parent.findById(chat.latestMessage.sender)
          .select("_id name email")
          .lean();
      chat.latestMessage.sender = user;
    }

    const plainData: ChatType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        users: d.users.map((user: any) => {
          return {
            ...user,
            _id: user._id.toString(),
          };
        }),
        latestMessage: {
          ...d.latestMessage,
          _id: d.latestMessage._id.toString(),
          sender: {
            ...d.latestMessage.sender,
            _id: d.latestMessage.sender._id.toString(),
          },
        },
      };
    });

    const isNext = totalCount > skipAmount + plainData.length;

    return { chats: plainData, totalCount, isNext };
  } catch (error: any) {
    throw new Error("Error in fetching chats", error.message);
  }
}
