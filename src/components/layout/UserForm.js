"use client";
import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";
import { useProfile } from "../UseProfile";

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
                <div className="grid grid-cols-2 gap-2">
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

                </div>
                <label>Country</label>
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
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