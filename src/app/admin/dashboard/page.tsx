import { logout } from '../actions';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';
import Payment from '@/models/Payment';
import { 
  Users, 
  LogOut, 
  Search, 
  Calendar, 
  Phone, 
  Hash, 
  LayoutDashboard,
  ArrowUpRight,
  RefreshCcw,
  Banknote,
  ClipboardList
} from 'lucide-react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import PaymentsTable from '@/components/admin/PaymentsTable';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeTab = searchParams.tab || 'registrations';

  // Server-side auth check
  const session = cookies().get('admin_session');
  if (!session) redirect('/admin/login');

  if (!process.env.MONGODB_URI) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-10">
        <div className="bg-red-50 border border-red-200 p-8 rounded-3xl text-center max-w-lg">
          <h1 className="text-2xl font-black text-red-700 mb-4">Database Configuration Missing</h1>
          <p className="text-red-600 font-medium mb-6">
            The <code>MONGODB_URI</code> environment variable is not set in Vercel. 
            Please add it to your Project Settings &gt; Environment Variables.
          </p>
          <form action={logout}>
            <button className="bg-red-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-700 transition-all">
              Sign Out and Check Settings
            </button>
          </form>
        </div>
      </div>
    );
  }

  try {
    await connectDB();
  } catch (err) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-10">
        <div className="bg-red-50 border border-red-200 p-8 rounded-3xl text-center max-w-lg">
          <h1 className="text-2xl font-black text-red-700 mb-4">Database Connection Error</h1>
          <p className="text-red-600 font-medium mb-6">
            Could not connect to MongoDB. Please check if your connection string is valid and your IP is whitelisted on MongoDB Atlas.
          </p>
        </div>
      </div>
    );
  }

  // Fetch registrations from MongoDB
  const rawRegistrations = await Registration.find({}).sort({ createdAt: -1 }).lean();
  const registrations = JSON.parse(JSON.stringify(rawRegistrations));

  // Fetch payments from MongoDB
  const rawPayments = await Payment.find({}).sort({ createdAt: -1 }).lean();
  const payments = JSON.parse(JSON.stringify(rawPayments));

  const totalRegistrations = registrations.length;
  const pendingPayments = payments.filter((p: any) => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0e1f3e] text-white hidden lg:flex flex-col p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
            <img src="/exceed-logo.png" alt="Exceed Logo" className="h-8 w-auto" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none text-white">Workshop</h2>
            <p className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <a 
            href="/admin/dashboard?tab=registrations" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border ${
              activeTab === 'registrations' 
                ? 'bg-white/10 border-white/10 text-white shadow-lg' 
                : 'border-transparent text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-bold text-sm">Registrations</span>
          </a>
          <a 
            href="/admin/dashboard?tab=payments" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all border relative ${
              activeTab === 'payments' 
                ? 'bg-white/10 border-white/10 text-white shadow-lg' 
                : 'border-transparent text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Banknote className="w-5 h-5" />
            <span className="font-bold text-sm">Zelle Payments</span>
            {pendingPayments > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#ca3433] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm">
                {pendingPayments}
              </span>
            )}
          </a>
        </nav>

        <form action={logout}>
          <button className="w-full flex items-center justify-between gap-3 px-4 py-4 mt-auto rounded-2xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 border border-white/5 transition-all group">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 opacity-70 group-hover:opacity-100" />
              <span className="font-bold text-sm">Logout</span>
            </div>
            <ArrowUpRight className="w-4 h-4 opacity-30 group-hover:opacity-100" />
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 md:p-10 mb-20 lg:mb-0">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#ca3433] bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 transition-colors pointer-events-auto">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold">Back to Website</span>
          </Link>
        </div>
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#0e1f3e] tracking-tight mb-2">
              {activeTab === 'registrations' ? 'Workshop Enrollments' : 'Payment Verification'}
            </h1>
            <p className="text-gray-500 font-bold">
              {activeTab === 'registrations' 
                ? 'Review and manage your latest workshop attendees' 
                : 'Review Zelle submission screenshots and verify payments'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white px-6 py-4 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f7e0e0] rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#ca3433]" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Students</p>
                <p className="text-2xl font-black text-[#0e1f3e]">{totalRegistrations}</p>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'registrations' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-[#ca3433] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-[#ca3433]/20 group">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-lg font-bold mb-1 opacity-90">Revenue Simulation</h3>
                <p className="text-5xl font-black mb-6 tracking-tight">${totalRegistrations * 129}</p>
                <div className="flex items-center gap-2 text-sm font-bold bg-white/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  <ArrowUpRight className="w-4 h-4" />
                  Estimated based on $129/pp
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0e1f3e] mb-2">Management Note</h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    Verify Zelle payments in the "Payments" tab before confirming these registrations as final in your records.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[#ca3433] font-black text-sm uppercase tracking-widest">
                  <ClipboardList className="w-4 h-4" />
                  Automated MongoDB Tracking
                </div>
              </div>
            </div>

            {/* Registrations Hybrid Table/Cards */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Desktop View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Registrant</th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Contact</th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Ref Number</th>
                      <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {registrations.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-20 text-center">
                          <div className="flex flex-col items-center gap-4 grayscale opacity-50 font-medium text-gray-400">
                            <Users className="w-16 h-16 text-gray-300" />
                            <p className="text-xl italic">No students registered yet</p>
                          </div>
                        </td>
                      </tr>
                    )}
                    {registrations.map((reg: any) => (
                      <tr key={reg._id} className="hover:bg-gray-50/80 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-black text-[#0e1f3e] text-lg group-hover:bg-[#ca3433] group-hover:text-white transition-colors capitalize border border-gray-100 group-hover:border-transparent">
                              {reg.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-black text-[#0e1f3e] text-lg leading-tight">{reg.name}</p>
                              <p className="text-xs text-[#ca3433] font-bold uppercase tracking-wider mt-1">{reg.courseName}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-gray-700 font-bold">
                              <Phone className="w-4 h-4 text-gray-300" />
                              {reg.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col items-center">
                            <div className="bg-gray-100 px-4 py-2 rounded-xl text-xs font-black text-[#0e1f3e] tracking-tight group-hover:bg-[#ca3433]/10 group-hover:text-[#ca3433] transition-colors border border-gray-200/50">
                              <Hash className="w-3 h-3 inline-block mr-1 opacity-50" />
                              {reg.reference}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                              <Calendar className="w-4 h-4 text-gray-300" />
                              {new Date(reg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden flex flex-col divide-y divide-gray-100">
                {registrations.length === 0 && (
                  <div className="p-10 text-center flex flex-col items-center gap-4 grayscale opacity-50 font-medium text-gray-400">
                    <Users className="w-12 h-12 text-gray-300" />
                    <p className="text-lg italic">No students registered yet</p>
                  </div>
                )}
                {registrations.map((reg: any) => (
                  <div key={reg._id} className="p-6 hover:bg-gray-50/80 transition-colors">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-black text-[#0e1f3e] text-lg">
                        {reg.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-[#0e1f3e] text-lg leading-tight">{reg.name}</p>
                        <p className="text-xs text-[#ca3433] font-bold uppercase tracking-wider mt-1">{reg.courseName}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Contact</p>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                          <Phone className="w-3 h-3 text-gray-400" />
                          {reg.phone}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ref Number</p>
                        <div className="flex flex-col gap-1.5 text-sm font-black text-[#0e1f3e]">
                          <span className="flex items-center gap-1.5"><Hash className="w-3 h-3 text-gray-400" />{reg.reference}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-3 col-span-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Registered Date</p>
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(reg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <PaymentsTable initialPayments={payments} />
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0e1f3e] border-t border-white/10 z-50 px-4 py-3 flex items-center justify-around pb-safe">
        <a 
          href="/admin/dashboard?tab=registrations" 
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'registrations' ? 'text-white' : 'text-white/50'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Students</span>
        </a>
        <a 
          href="/admin/dashboard?tab=payments" 
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative ${
            activeTab === 'payments' ? 'text-white' : 'text-white/50'
          }`}
        >
          <Banknote className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1">Payments</span>
          {pendingPayments > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 bg-[#ca3433] text-white text-[8px] font-black rounded-full flex items-center justify-center">
              {pendingPayments}
            </span>
          )}
        </a>
        <form action={logout}>
          <button className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-white/50 hover:text-red-400">
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-1">Logout</span>
          </button>
        </form>
      </div>
    </div>
  );
}
