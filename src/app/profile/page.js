"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import toast from "react-hot-toast";
import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";

export default function ProfilePage() {

    const session = useSession();
    console.log({ session });
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setZipCode(data.zipCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(e) {
        e.preventDefault();

        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: userName,
                    image,
                    streetAddress,
                    phone,
                    zipCode,
                    city,
                    country,
                }),
            });
            if (response.ok)
                resolve()
            else
                reject();
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile Saved!',
            error: 'Error!',
        });
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-md mx-auto mt-8">
                <div className="flex gap-4">
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label>First and Last Name</label>
                        <input
                            type="text"
                            placeholder="First and last name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            disabled={true}
                            value={session.data.user.email}
                            placeholder={'email'}
                        />
                        <label>Phone</label>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                        <label>Street Address</label>
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={streetAddress}
                            onChange={e => setStreetAddress(e.target.value)}
                        />
                        <div className="flex gap-2">
                            <div>
                                <label>Zip Code</label>
                                <input
                                    style={{ 'margin': '0' }}
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>City</label>
                                <input
                                    style={{ 'margin': '0' }}
                                    type="text"
                                    placeholder="Zip Code"
                                    value={zipCode}
                                    onChange={e => setZipCode(e.target.value)}
                                />
                            </div>
                        </div>
                        <label>Country</label>
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}