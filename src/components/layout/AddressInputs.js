export default function AddressInputs({ addressProps, setAddressProps, disabled = false }) {

    const { phone, streetAddress, zipCode, city, country } = addressProps;

    return (
        <>
            <label>Phone</label>
            <input
                disabled={disabled}
                type="tel"
                placeholder="Phone Number"
                value={phone || ''}
                onChange={e => setAddressProps('phone', e.target.value)}
            />
            <label>Street Address</label>
            <input
                disabled={disabled}
                type="text"
                placeholder="Street Address"
                value={streetAddress || ''}
                onChange={e => setAddressProps('streetAddress', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label>City</label>
                    <input
                        disabled={disabled}
                        style={{ 'margin': '0' }}
                        type="text"
                        placeholder="Zip Code"
                        value={zipCode || ''}
                        onChange={e => setAddressProps('zipCode', e.target.value)}
                    />
                </div>
                <div>
                    <label>Zip Code</label>
                    <input
                        disabled={disabled}
                        style={{ 'margin': '0' }}
                        type="text"
                        placeholder="City"
                        value={city || ''}
                        onChange={e => setAddressProps('city', e.target.value)}
                    />
                </div>
            </div>
            <label>Country</label>
            <input
                disabled={disabled}
                type="text"
                placeholder="Country"
                value={country || ''}
                onChange={e => setAddressProps('country', e.target.value)}
            />
        </>
    );
}