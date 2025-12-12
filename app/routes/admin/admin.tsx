
import {
  Map,
  PlusCircle,

  Bell,
  DollarSign,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router';
import Loading from '~/components/Loading';
import { formatCurrency } from '~/lib/utils/currencyFormator';
import type { BookingModel } from '~/models/booking';
import type { Tour } from '~/models/tour';
import { bookingService } from '~/services/bookingService';
import { tourService } from '~/services/tourService';





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

  const [bookingList, setBookingList] = useState<BookingModel[]>([]);
  const [tourList, setTourList] = useState<Tour[]>([]);

  const [loadingItems, setLoadingItems] = useState([false, false, false, false]);

  const [stats, setStats] = useState([
    { label: 'Total Revenue', value: '฿0', change: '+0%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Active Tours', value: '0', change: '0', icon: Map, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Bookings', value: '0', change: '+0%', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Total Customers', value: '0', change: '+0%', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
  ]);


  const updateLoading = (index: number, value: boolean) => {
    setLoadingItems(prevItems =>
      prevItems.map((item, i) => (i === index ? value : item))
    );
  };


  useEffect(() => {
    // Fetch booking data here if needed
    bookingService.getAllBookings().then((data) => {
      setBookingList(data);
      updateLoading(0, true);
      updateLoading(2, true);
      updateLoading(3, true);

    });

    tourService.getAll().then((data) => {
      setTourList(data);
      updateLoading(1, true);
    });

  }, []);

  useEffect(() => {
    // A. Calculate Revenue
    const totalRevenue = bookingList.filter(item => ["complete","paid"].includes(item.status)).reduce((sum, booking) => {
      return sum + (Number(booking.totalPrice) || 0);
    }, 0);

    // B. Calculate Active Tours
    const activeToursCount = tourList.filter(t => t.status === 'published').length;

    // C. Calculate Unique Customers
    const uniqueCustomers = new Set(bookingList.map(b => b.email || b.firstName)).size;


    setStats([
      {
        label: 'Total Revenue',
        value: `฿${totalRevenue.toLocaleString()}`,
        change: '+0%', // You can add logic here later to compare with last month
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-100'
      },
      {
        label: 'Active Tours',
        value: activeToursCount.toString(),
        change: `${activeToursCount > 0 ? '+' : ''}0`,
        icon: Map,
        color: 'text-blue-600',
        bg: 'bg-blue-100'
      },
      {
        label: 'Total Bookings',
        value: bookingList.length.toString(),
        change: '+0%',
        icon: Calendar,
        color: 'text-purple-600',
        bg: 'bg-purple-100'
      },
      {
        label: 'Total Customers',
        value: uniqueCustomers.toString(),
        change: '+0%',
        icon: Users,
        color: 'text-orange-600',
        bg: 'bg-orange-100'
      },
    ]);

  }, [bookingList, tourList]);

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
          {stats.map((stat, index) => (
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
              {loadingItems[index] ? <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3> : 
              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                <Loading className='mt-2 size-4 top-0 right-0 border-blue-500 absolute' />
              </div>
              }
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
                  {bookingList.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{booking.firstName}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{booking.tour}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{booking.date}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{formatCurrency(booking.totalPrice)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${booking.status === 'complete' ? 'bg-green-100 text-green-800' :
                            booking.status === 'paid' ? 'bg-yellow-100 text-yellow-800' :
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
               <PopularTours bookingList={bookingList} />
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



interface PopularToursProps {
  bookingList: BookingModel[];
}

 function PopularTours({ bookingList }: PopularToursProps) {

  const popularTours = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Previous month calculation
    const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    // Map: Key = Tour (ID or Name), Value = Stats
    const statsMap: Record<string, { name: string; current: number; previous: number }> = {};

    bookingList.forEach((booking) => {
      // CHANGED: Check 'tour' instead of 'tourName'
      if (!booking.tour) return;

      // CHANGED: Use 'tour' as the identifier
      const tourIdentifier = booking.tour; 

      // Initialize if not exists
      if (!statsMap[tourIdentifier]) {
        statsMap[tourIdentifier] = { 
            name: tourIdentifier, // We use this field for display now
            current: 0, 
            previous: 0 
        };
      }

      // Date Parsing
      let dateObj: Date | null = null;
      if (booking.created_at && typeof (booking.created_at as any).toDate === 'function') {
        dateObj = (booking.created_at as any).toDate();
      } else if (booking.created_at) {
        dateObj = new Date(booking.created_at as any);
      } else if (booking.date) {
        dateObj = new Date(booking.date);
      }

      if (dateObj) {
        const bMonth = dateObj.getMonth();
        const bYear = dateObj.getFullYear();

        if (bMonth === currentMonth && bYear === currentYear) {
          statsMap[tourIdentifier].current += 1;
        } else if (bMonth === prevMonth && bYear === prevYear) {
          statsMap[tourIdentifier].previous += 1;
        }
      }
    });

    // Transform to array and calculate trend
    const results = Object.values(statsMap).map((item) => {
      let trend = 0;
      if (item.previous === 0) {
        trend = item.current > 0 ? 100 : 0;
      } else {
        trend = Math.round(((item.current - item.previous) / item.previous) * 100);
      }

      return {
        name: item.name,
        bookings: item.current,
        trend: trend,
      };
    });

    // Sort by bookings (Desc) and take top 5
    return results.sort((a, b) => b.bookings - a.bookings).slice(0, 5);

  }, [bookingList]);

  return (
    <div className="bg-white h-full">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Tours</h3>

      {popularTours.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
          <p className="text-sm">No bookings found for this month.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {popularTours.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100/50"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                  #{i + 1}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate pr-2">
                    {/* This now displays the 'tour' field */}
                    {item.name} 
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.bookings} bookings this month
                  </p>
                </div>
              </div>

              {/* <div
                className={`text-xs font-bold whitespace-nowrap ${
                  item.trend > 0
                    ? "text-green-600"
                    : item.trend < 0
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {item.trend > 0 ? "+" : ""}
                {item.trend}%
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}