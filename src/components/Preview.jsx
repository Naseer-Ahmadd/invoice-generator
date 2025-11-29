import React from 'react';

function Preview({ data }) {
    // Calculate total
    const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0);
    const balanceDue = totalAmount - (data.balanceReceived || 0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full max-w-[210mm] bg-white shadow-lg print:shadow-none">
            {/* A4 Aspect Ratio Container */}
            <div className="aspect-[1/1.414] relative flex flex-col p-8 text-sm text-gray-800">

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                        <img src="/src/assets/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
                        <div>
                            <h1 className="text-2xl font-bold text-purple-600">{data.company.name}</h1>
                            <p className="text-orange-500 font-medium tracking-wide uppercase text-xs">{data.company.tagline}</p>
                        </div>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                        <p className="max-w-[200px]">{data.company.address}</p>
                        <p className="mt-1">Phone: {data.company.phone}</p>
                    </div>
                </div>

                {/* Invoice Title & Details */}
                <div className="flex justify-between items-end mb-6 border-b-2 border-purple-600 pb-2">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">INVOICE</h2>
                    </div>
                    <div className="text-right">
                        <p><span className="font-semibold">Invoice No:</span> {data.invoice.number}</p>
                        <p><span className="font-semibold">Date:</span> {data.invoice.date}</p>
                    </div>
                </div>

                {/* Client Info */}
                <div className="mb-8">
                    <p className="font-semibold text-gray-600 mb-1">Bill To:</p>
                    <p className="text-lg font-bold">{data.client.name}</p>
                </div>

                {/* Items Table */}
                <div className="flex-grow">
                    <table className="w-full mb-8">
                        <thead>
                            <tr className="bg-purple-100 text-purple-900 border-b border-purple-200">
                                <th className="py-2 px-3 text-left w-12">S.No</th>
                                <th className="py-2 px-3 text-left">Particulars</th>
                                <th className="py-2 px-3 text-center w-20">Qnty</th>
                                <th className="py-2 px-3 text-right w-24">Rate (Rs)</th>
                                <th className="py-2 px-3 text-right w-28">Amount (Rs)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-100">
                                    <td className="py-2 px-3 text-left">{index + 1}</td>
                                    <td className="py-2 px-3 text-left">{item.particular}</td>
                                    <td className="py-2 px-3 text-center">{item.quantity}</td>
                                    <td className="py-2 px-3 text-right">{item.rate.toLocaleString()}</td>
                                    <td className="py-2 px-3 text-right font-medium">{item.amount.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-50 font-bold">
                                <td colSpan="4" className="py-3 px-3 text-right">Total:</td>
                                <td className="py-3 px-3 text-right text-lg">Rs {totalAmount.toLocaleString()}</td>
                            </tr>
                            {data.balanceReceived > 0 && (
                                <>
                                    <tr className="bg-white text-gray-600">
                                        <td colSpan="4" className="py-2 px-3 text-right">Balance Received:</td>
                                        <td className="py-2 px-3 text-right">Rs {data.balanceReceived.toLocaleString()}</td>
                                    </tr>
                                    <tr className="bg-gray-100 font-bold text-purple-700">
                                        <td colSpan="4" className="py-3 px-3 text-right">Balance Due:</td>
                                        <td className="py-3 px-3 text-right text-lg">Rs {balanceDue.toLocaleString()}</td>
                                    </tr>
                                </>
                            )}
                        </tfoot>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8 border-t border-gray-200 text-xs text-gray-600">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="font-bold mb-1">Bank Details:</p>
                            <p>{data.bank.note}</p>
                            <p>Bank: {data.bank.name}</p>
                            <p>A/No: {data.bank.accountNo}</p>
                        </div>
                        <div className="text-right">
                            <p className="italic">{data.notes}</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Print Button (Visible only on screen, inside the preview area but outside the printed page ideally, or just floating) */}
            <div className="absolute top-4 right-4 print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 flex items-center gap-2"
                >
                    Print / Download PDF
                </button>
            </div>
        </div>
    );
}

export default Preview;
