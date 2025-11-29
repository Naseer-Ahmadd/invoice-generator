import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

function Editor({ data, onChange }) {
    const handleCompanyChange = (e) => {
        onChange({ company: { ...data.company, [e.target.name]: e.target.value } });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            onChange({ company: { ...data.company, logo: logoUrl } });
        }
    };

    const handleClientChange = (e) => {
        onChange({ client: { ...data.client, [e.target.name]: e.target.value } });
    };

    const handleInvoiceChange = (e) => {
        onChange({ invoice: { ...data.invoice, [e.target.name]: e.target.value } });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;

        // Calculate amount automatically
        if (field === 'quantity' || field === 'rate') {
            newItems[index].amount = newItems[index].quantity * newItems[index].rate;
        }

        onChange({ items: newItems });
    };

    const addItem = () => {
        const newItem = {
            id: Date.now(),
            particular: '',
            quantity: 1,
            rate: 0,
            amount: 0,
        };
        onChange({ items: [...data.items, newItem] });
    };

    const removeItem = (index) => {
        const newItems = data.items.filter((_, i) => i !== index);
        onChange({ items: newItems });
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Invoice Editor</h2>

            {/* Company Details */}
            <section className="space-y-3 border-b pb-4">
                <h3 className="font-semibold text-gray-700">Company Details</h3>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <input
                    type="text"
                    name="name"
                    value={data.company.name}
                    onChange={handleCompanyChange}
                    placeholder="Company Name"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="tagline"
                    value={data.company.tagline}
                    onChange={handleCompanyChange}
                    placeholder="Tagline"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="address"
                    value={data.company.address}
                    onChange={handleCompanyChange}
                    placeholder="Address"
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    name="phone"
                    value={data.company.phone}
                    onChange={handleCompanyChange}
                    placeholder="Phone"
                    className="w-full p-2 border rounded"
                />
            </section>

            {/* Client Details */}
            <section className="space-y-3 border-b pb-4">
                <h3 className="font-semibold text-gray-700">Client Details</h3>
                <input
                    type="text"
                    name="name"
                    value={data.client.name}
                    onChange={handleClientChange}
                    placeholder="Client Name"
                    className="w-full p-2 border rounded"
                />
            </section>

            {/* Invoice Details */}
            <section className="space-y-3 border-b pb-4">
                <h3 className="font-semibold text-gray-700">Invoice Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="number"
                        value={data.invoice.number}
                        onChange={handleInvoiceChange}
                        placeholder="Invoice Number"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="date"
                        name="date"
                        value={data.invoice.date}
                        onChange={handleInvoiceChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </section>

            {/* Line Items */}
            <section className="space-y-3 border-b pb-4">
                <h3 className="font-semibold text-gray-700">Line Items</h3>
                {data.items.map((item, index) => (
                    <div key={item.id} className="flex flex-wrap md:flex-nowrap gap-2 items-start mb-4 md:mb-2 border-b pb-4 md:border-b-0 md:pb-0">
                        <div className="w-full md:flex-1 order-1 md:order-none">
                            <input
                                type="text"
                                value={item.particular}
                                onChange={(e) => handleItemChange(index, 'particular', e.target.value)}
                                placeholder="Particular"
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex gap-2 w-full md:w-auto order-2 md:order-none">
                            <div className="w-20">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                                    placeholder="Qty"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="w-24">
                                <input
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                                    placeholder="Rate"
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex-1 md:w-24 pt-2 text-right font-medium">
                                {item.amount.toLocaleString()}
                            </div>
                            <button
                                onClick={() => removeItem(index)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded"
                                title="Remove Item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    onClick={addItem}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-2"
                >
                    <Plus size={18} /> Add Item
                </button>
            </section>

            {/* Payment Details */}
            <section className="space-y-3">
                <h3 className="font-semibold text-gray-700">Payment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Balance Received</label>
                        <input
                            type="number"
                            value={data.balanceReceived}
                            onChange={(e) => onChange({ balanceReceived: Number(e.target.value) })}
                            placeholder="0"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Editor;
