
import {
  Map,
  PlusCircle,

  Bell,
  DollarSign,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

import {  useNavigate } from 'react-router';

// --- Sidebar Component ---
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const STATS = [
  { label: 'Total Revenue', value: '$124,500', change: '+12%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Active Tours', value: '45', change: '+3', icon: Map, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'New Bookings', value: '182', change: '+24%', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Total Customers', value: '2,420', change: '+8%', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
];

const RECENT_BOOKINGS = [
  { id: 1, customer: 'Alice Johnson', tour: 'Kyoto Temple Run', date: 'Oct 24, 2023', amount: '$450', status: 'Confirmed' },
  { id: 2, customer: 'Bob Smith', tour: 'Island Hopping', date: 'Oct 23, 2023', amount: '$1,200', status: 'Pending' },
  { id: 3, customer: 'Charlie Brown', tour: 'City Night Walk', date: 'Oct 23, 2023', amount: '$85', status: 'Confirmed' },
  { id: 4, customer: 'Diana Prince', tour: 'Mountain Trek', date: 'Oct 22, 2023', amount: '$650', status: 'Cancelled' },
  { id: 5, customer: 'Evan Wright', tour: 'Kyoto Temple Run', date: 'Oct 21, 2023', amount: '$450', status: 'Confirmed' },
];

const POPULAR_TOURS = [
  { name: 'Kyoto Temple Run', bookings: 84, trend: 12 },
  { name: 'Island Hopping Phi Phi', bookings: 65, trend: -5 },
  { name: 'Grand Canyon Helo', bookings: 42, trend: 8 },
];
// --- Main Layout ---
export default function AdminLayout() {
   const navigate = useNavigate();

  return (
    <div className="flex min-h-screen  font-sans text-slate-900">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 mt-1">Welcome back, here's what's happening with your tours today.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/admin/tour/add')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors font-medium"
            >
              <PlusCircle size={18} />
              Add New Tour
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STATS.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-lg text-slate-900">Recent Bookings</h2>
              <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Tour</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_BOOKINGS.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{booking.customer}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{booking.tour}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{booking.date}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{booking.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Popular Tours / Quick Links */}
          <div className="space-y-6">
            {/* Popular Tours */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-bold text-lg text-slate-900 mb-4">Popular Tours</h2>
              <div className="space-y-4">
                {POPULAR_TOURS.map((tour, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                        #{i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{tour.name}</p>
                        <p className="text-xs text-slate-500">{tour.bookings} bookings this month</p>
                      </div>
                    </div>
                    <div className={`text-xs font-bold ${tour.trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {tour.trend > 0 ? '+' : ''}{tour.trend}%
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/admin/tour/list')}
                className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                Manage All Tours
              </button>
            </div>

            {/* System Status or Notifications */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg">System Update</h3>
                  <p className="text-blue-100 text-sm mt-1 opacity-90">New features available for the Tour Editor.</p>
                </div>
                <span className="bg-white/20 p-2 rounded-lg">
                  <Bell size={20} />
                </span>
              </div>
              <button className="mt-4 text-xs bg-white text-blue-700 px-3 py-1.5 rounded-md font-bold hover:bg-blue-50 transition-colors">
                Read Changelog
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}