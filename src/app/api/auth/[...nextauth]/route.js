// import clientPromise from "@/libs/mongoConnect";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import { User } from "@/models/User";
// import NextAuth, { getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import { UserInfo } from "@/models/UserInfo";

// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         mongoose.connect(process.env.MONGO_URL);
//         const user = await User.findOne({ email });
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         if (passwordOk) {
//           return user;
//         }

//         return null
//       }
//     })
//   ],
// };


// export async function isAdmin(req) {
//   const session = await getServerSession(req, authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) return false;
//   const userInfo = await UserInfo.findOne({ email: userEmail });
//   if (!userInfo) return false;
//   return userInfo.admin;
// }

// export default async function handler(req, res) {
//   const isAdminValue = await isAdmin(req);
//   if (req.method === "GET") {
//     return res.status(200).json({ isAdmin: isAdminValue });
//   } else if (req.method === "POST") {
//     return res.status(200).json({ message: "POST request received" });
//   } else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }

// // export async function isAdmin() {
// //   const session = await getServerSession(authOptions);
// //   const userEmail = session?.user?.email;
// //   if (!userEmail) {
// //     return false;
// //   }
// //   const userInfo = await UserInfo.findOne({ email: userEmail });
// //   if (!userInfo) {
// //     return false;
// //   }
// //   return userInfo.admin;
// // }

// // const handler = NextAuth(authOptions);

import clientPromise from "@/libs/mongoConnect";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "@/models/User";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { UserInfo } from "@/models/UserInfo";


export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (passwordOk) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export async function isAdmin(req) {
  const session = await getServerSession(req, authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) return false;
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) return false;
  return userInfo.admin;
}

export async function GET(req) {
  const isAdminValue = await isAdmin(req);
  return new Response(JSON.stringify({ isAdmin: isAdminValue }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  return new Response(JSON.stringify({ message: "POST request received" }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
