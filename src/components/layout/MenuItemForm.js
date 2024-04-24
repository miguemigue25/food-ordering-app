import EditableImage from "@/components/layout/EditableImage";
import { useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState([]);

    function addSize() {
        setSizes(oldSizes => {
            return [...oldSizes, { name: '', price: 0 }];
        });
    }

    return (
        <form
            onSubmit={e => onSubmit(e, { image, name, description, basePrice })}
            className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4" style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div>
                    <EditableImage link={image} setLink={setImage} />
                </div>
                <div className="grow">
                    <label>Item name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <label>Base Price</label>
                    <input
                        type="text"
                        value={basePrice}
                        onChange={e => setBasePrice(e.target.value)}
                    />
                    <div className="bg-gray-200 p-2 rounded-md mb-2">
                        <label>Sizes</label>
                        {sizes?.length > 0 && sizes.map(size => (
                            <div className="flex gap-2" key={''}>
                                <input
                                    type="text" placeholder="Size name"
                                    value={size.name} />
                                <input
                                    type="text" placeholder="Extra price"
                                    value={size.price} />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addSize}
                            className="bg-white">Add item size</button>
                    </div>
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}