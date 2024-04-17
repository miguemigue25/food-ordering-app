"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {

    const session = useSession();
    const [userName, setUserName] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(e) {
        e.preventDefault();
        setSaved(false);
        setIsSaving(true);

        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: userName }),
        });
        setIsSaving(false);
        if (response.ok) {
            setSaved(true);
        }
    }

    async function handleFileChange(e) {
        const files = e.target.files;
        if (files?.length === 1) {

            const data = new FormData;
            data.set('files', files[0]);
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
        }
    }

    if (status === 'loading') {
        return 'Loading...';
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    const userImage = session.data.user.image;

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto">
                {saved && (
                    <h2 className="text-center bg-green-200 p-4 rounded-lg border-2 border-green-500">
                        Profile saved!
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-200 p-4 rounded-lg border-2 border-blue-500">
                        Saving...
                    </h2>
                )}
                <div className="flex gap-4 items-center">
                    <div className="p-2 rounded-lg relative">
                        <Image className="rounded-lg w-full h-full mb-1" src={userImage} width={250} height={250} alt={'avatar'} />
                        <label>
                            <input type="file" className="hidden" onChange={handleFileChange} />
                            <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
                                Edit
                            </span>
                        </label>
                        {/* <button type="button">Edit</button> */}
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and last name" value={userName}
                            onChange={e => setUserName(e.target.value)} />
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}