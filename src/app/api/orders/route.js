import mongoose from "mongoose";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
import { isAdmin } from "../../../utils/auth";


export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
        return Response.json(await Order.findById(_id));
    }

    if (admin) {
        return Response.json(await Order.find());
    }

    if (userEmail) {
        return Response.json(await Order.find({ userEmail }));
    }
}