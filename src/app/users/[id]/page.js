'use client';
import { useProfile } from "@/components/UseProfile";
import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function EditUserPage() {

    const { loading, data } = useProfile();
    const [user, setUser] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetch('/api/profile?_id=' + id).then(res => {
            res.json().then(user => {
                setUser(user);
            });
        })
        // eslint-disable-next-line
    }, []);

    async function handleSaveButtonClick(e, data) {
        e.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });
            if (res.ok)
                resolve();
            else
                reject();
        });
        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'An error has occurred while saving the user',
        })

    }

    if (loading) {
        return 'Loading user profile...';
    }

    if (!data.admin) {
        return 'NOT AN ADMIN';
    }

    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}
