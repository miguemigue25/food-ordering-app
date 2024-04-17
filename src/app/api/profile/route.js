import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session.user.email;

    if ('name' in data) {
        // update username
        // const result = await User.updateOne({ email }, { name: data.name });
        // const user = await User.findOne({ email });
        // user.name = data.name;
        // await user.save();
        // console.log({ email, update: { name: data.name }, result });
        await User.updateOne({email}, {name: data.name});
    }
    return Response.json(true);
}