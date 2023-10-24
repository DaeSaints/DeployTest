import User from "@/libs/models/user.model";
import connectDB from "@/libs/mongodb";

interface Params {
  account: any;
  profile: any;
}
export async function signInWithOAuth({ account, profile }: Params) {
  try {
    connectDB();

    const user = await User.findOne({ email: profile.email });
    if (user) return true;

    const newUser = new User({
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      // provider: account.provider,
    });

    await newUser.save();

    return true;
  } catch (error: any) {
    throw new Error(`Error signInWithOAuth: ${error.message}`);
  }
}
