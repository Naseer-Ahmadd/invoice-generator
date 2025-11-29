import React, { useState } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import defaultLogo from './assets/logo.png';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    company: {
      name: 'AmazeWeb Solutions',
      tagline: 'Simplifying Business World',
      address: 'Numan Plaza Karan Nagar, Srinagar J&K 190010',
      phone: '9906545900 / 9858392856',
      logo: defaultLogo,
    },
    client: {
      name: 'MR: Naseer Ahmad',
    },
    invoice: {
      number: '001',
      date: new Date().toISOString().split('T')[0],
    },
    items: [
      { id: 1, particular: 'Web Development Services', quantity: 1, rate: 15000, amount: 15000 },
    ],
    notes: 'Note: Computer generated invoice, signature not required.',
    bank: {
      note: 'Make all cheques payable to: AmazeWeb Solutions',
      name: 'J&K Bank Dalgate',
      accountNo: '0933010100000022',
    },
    balanceReceived: 0,
  });

  const updateInvoiceData = (newData) => {
    setInvoiceData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen bg-gray-100 overflow-hidden">
      {/* Left Side: Editor */}
      <div className="w-full lg:w-1/2 h-auto lg:h-full overflow-y-auto border-r border-gray-300 bg-white p-6 print:hidden">
        <Editor data={invoiceData} onChange={updateInvoiceData} />
      </div>

      {/* Right Side: Preview */}
      <div className="w-full lg:w-1/2 h-auto lg:h-full overflow-y-auto bg-gray-500 p-8 flex justify-center items-start print:w-full print:h-auto print:bg-white print:p-0 print:overflow-visible overflow-x-auto">
        <div className="min-w-fit">
          <Preview data={invoiceData} />
        </div>
      </div>
    </div>
  );
}

export default App;
