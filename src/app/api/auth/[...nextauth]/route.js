// import clientPromise from "@/libs/mongoConnect";
// import { UserInfo } from "@/models/UserInfo";
// import bcrypt from "bcrypt";
// import * as mongoose from "mongoose";
// import { User } from '@/models/User';
// import NextAuth, { getServerSession } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"

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

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return false;
//   }
//   const userInfo = await UserInfo.findOne({ email: userEmail });
//   if (!userInfo) {
//     return false;
//   }
//   return userInfo.admin;
// }

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }


import clientPromise from "@/libs/mongoConnect";
import { UserInfo } from "@/models/UserInfo";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from '@/models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

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

export default async function handler(req) {
  const session = await getServerSession(req, res, authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return new Response(JSON.stringify({ isAdmin: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return new Response(JSON.stringify({ isAdmin: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const isAdminValue = userInfo.admin;
  if (req.method === "GET") {
    return new Response(JSON.stringify({ isAdmin: isAdminValue }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else if (req.method === "POST") {
    return new Response(JSON.stringify({ message: "POST request received" }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      headers: { 'Content-Type': 'application/json' },
      status: 405,
    });
  }
}
