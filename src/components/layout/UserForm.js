"use client";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {

    const [userName, setUserName] = useState(user?.name || '');
    const [image, setImage] = useState(user?.image || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [zipCode, setZipCode] = useState(user?.zipCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    const [admin, setAdmin] = useState(user?.admin || false);
    const { data: loggedInUserData } = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'phone') setPhone(value);
        if (propName === 'streetAddress') setStreetAddress(value);
        if (propName === 'city') setCity(value);
        if (propName === 'zipCode') setZipCode(value);
        if (propName === 'country') setCountry(value);
    }

    return (
        <div className="flex gap-4">
            <div>
                <div className="p-2 rounded-lg relative max-w-[120px]">
                    <EditableImage link={image} setLink={setImage} />
                </div>
            </div>
            <form
                className="grow"
                onSubmit={e =>
                    onSave(e, {
                        name: userName, image, phone, admin, streetAddress, city, country, zipCode
                    })
                }
            >
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
                    value={user.email}
                    placeholder={'email'}
                />
                <AddressInputs addressPops={{phone, streetAddress, city, zipCode, country}} 
                    setAddressProps={handleAddressChange}
                />
                {loggedInUserData.admin && (
                    <div>
                        <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                            <input
                                id="adminCb" type="checkbox" className="" value={'1'}
                                checked={admin}
                                onClick={e => setAdmin(e.target.checked)}
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}