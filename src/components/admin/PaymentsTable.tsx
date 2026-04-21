"use client";

import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Eye, 
  Loader2,
  Clock,
  Phone,
  Hash,
  User,
  CreditCard
} from 'lucide-react';

interface Payment {
  _id: string;
  name: string;
  phone: string;
  reference: string;
  screenshotUrl: string;
  courseName: string;
  amount: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
}

export default function PaymentsTable({ initialPayments }: { initialPayments: Payment[] }) {
  const [payments, setPayments] = useState(initialPayments);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleStatusUpdate = async (id: string, newStatus: 'verified' | 'rejected') => {
    setUpdatingId(id);
    try {
      const response = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      setPayments(payments.map(p => p._id === id ? { ...p, status: newStatus } : p));
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update payment status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Image Modal Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img 
              src={selectedImage} 
              alt="Payment Screenshot" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
            <a 
              href={selectedImage} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-2 inline-block text-sm text-blue-500 hover:underline"
            >
              Open in new tab
            </a>
            <button 
              className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Registrant</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Screenshot</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Details</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payments.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4 grayscale opacity-50 font-medium text-gray-400">
                    <Clock className="w-16 h-16 text-gray-300" />
                    <p className="text-xl">No Zelle submissions to review</p>
                  </div>
                </td>
              </tr>
            )}
            {payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-all capitalize shadow-sm ${
                      payment.status === 'verified' ? 'bg-green-100 text-green-700' : 
                      payment.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {payment.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-[#0e1f3e] text-lg leading-tight">{payment.name}</p>
                      <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
                        <CreditCard className="w-3 h-3" />
                        {payment.amount}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    {payment.screenshotUrl ? (
                      <div 
                        className="relative w-16 h-16 rounded-xl overflow-hidden cursor-pointer group/img border border-gray-100 shadow-sm"
                        onClick={() => setSelectedImage(payment.screenshotUrl)}
                      >
                        <img 
                          src={payment.screenshotUrl} 
                          alt="Screenshot" 
                          className="w-full h-full object-cover transition-transform group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                        <XCircle className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                    {payment.screenshotUrl && (
                      <a
                        href={payment.screenshotUrl}
                        download={`zelle_${payment._id}.png`}
                        className="mt-2 inline-block text-xs text-blue-500 hover:underline"
                      >
                        Download
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1 text-center md:text-left flex flex-col items-center md:items-start max-w-[200px] mx-auto">
                    <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {payment.phone}
                    </p>
                    <p className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Hash className="w-3 h-3 text-gray-400" />
                      {payment.reference}
                    </p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-sm ${
                      payment.status === 'verified' ? 'bg-green-500 text-white' : 
                      payment.status === 'rejected' ? 'bg-red-500 text-white' : 
                      'bg-amber-500 text-white'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {payment.status === 'pending' && (
                      <>
                        <button
                          disabled={!!updatingId}
                          onClick={() => handleStatusUpdate(payment._id, 'verified')}
                          className="p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                          title="Verify Payment"
                        >
                          {updatingId === payment._id ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                        </button>
                        <button
                          disabled={!!updatingId}
                          onClick={() => handleStatusUpdate(payment._id, 'rejected')}
                          className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                          title="Reject Payment"
                        >
                          {updatingId === payment._id ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                        </button>
                      </>
                    )}
                    {payment.status !== 'pending' && (
                      <p className="text-xs font-bold text-gray-400 italic px-4 py-3">Processed</p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col divide-y divide-gray-100">
        {payments.length === 0 && (
          <div className="p-10 text-center flex flex-col items-center gap-4 grayscale opacity-50 font-medium text-gray-400">
            <Clock className="w-12 h-12 text-gray-300" />
            <p className="text-lg">No Zelle submissions to review</p>
          </div>
        )}
        {payments.map((payment) => (
          <div key={payment._id} className="p-6 hover:bg-gray-50/80 transition-colors relative">
            <div className="flex items-start gap-4 mb-4">
              {payment.screenshotUrl ? (
                <div 
                  className="relative w-16 h-16 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 border border-gray-100 shadow-sm group/img"
                  onClick={() => setSelectedImage(payment.screenshotUrl)}
                >
                  <img src={payment.screenshotUrl} alt="Screenshot" className="w-full h-full object-cover transition-transform group-hover/img:scale-110" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-white drop-shadow-md" />
                  </div>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 text-gray-300" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-black text-[#0e1f3e] text-lg leading-tight truncate pr-2">{payment.name}</p>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm shrink-0 ${
                    payment.status === 'verified' ? 'bg-green-500 text-white' : 
                    payment.status === 'rejected' ? 'bg-red-500 text-white' : 
                    'bg-amber-500 text-white'
                  }`}>
                    {payment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium flex items-center gap-1 mt-1">
                  <CreditCard className="w-3 h-3" />
                  {payment.amount}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                <p className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                  <Phone className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{payment.phone}</span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ref Number</p>
                <p className="flex items-center gap-1.5 text-xs font-black text-[#0e1f3e]">
                  <Hash className="w-3 h-3 text-gray-400 shrink-0" />
                  <span className="truncate">{payment.reference}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
              {payment.status === 'pending' ? (
                <>
                  <button
                    disabled={!!updatingId}
                    onClick={() => handleStatusUpdate(payment._id, 'verified')}
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 text-sm font-bold"
                  >
                    {updatingId === payment._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                    Verify
                  </button>
                  <button
                    disabled={!!updatingId}
                    onClick={() => handleStatusUpdate(payment._id, 'rejected')}
                    className="flex-1 flex items-center justify-center gap-2 p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 text-sm font-bold"
                  >
                    {updatingId === payment._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                    Reject
                  </button>
                </>
              ) : (
                <p className="text-xs font-bold text-gray-400 italic w-full text-center py-2">Processed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
