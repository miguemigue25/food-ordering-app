"use client";
import { useProfile } from "@/components/UseProfile";
import SectionHeaders from "@/components/layout/Sectionheaders";
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";

export default function OrdersPage() {

    const [orders, setOrders] = useState([]);
    const { loading, data: profile } = useProfile();

    useEffect(() => {
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
            })
        })
    }, []);

    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin} />
            <div className="mt-8">
                {orders?.length > 0 && orders.map(order => (
                    <div key={order._id} className="bg-gray-100 mb-2 p-4 rounded-lg grid items-center grid-cols-3 gap-4">
                        <div className="">
                            <span className={
                                (order.paid ? 'bg-green-500' : 'bg-red-400')
                                + ' p-2 rounded-md text-white'}>
                                {order.paid ? 'Paid' : 'Not Paid'}
                            </span>
                        </div>
                        <div className="">
                            <div className="">{order.userEmail}</div>
                            <div className="text-gray-500 text-sm">
                                {order.cartProducts.map(p => p.name).join(', ')}
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                            {dbTimeForHuman(order.createdAt)}
                  
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}