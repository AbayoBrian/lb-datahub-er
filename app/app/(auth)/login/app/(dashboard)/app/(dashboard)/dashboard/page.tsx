'use client'

import { Users, UserCog, DollarSign, Calendar } from 'lucide-react'

export default function DashboardPage() {
  const metrics = [
    { title: 'Total Students', value: '1,247', change: '+12.5%', icon: Users },
    { title: 'Total Teachers', value: '86', change: '+5.2%', icon: UserCog },
    { title: 'Monthly Revenue', value: 'KES 2.4M', change: '+8.7%', icon: DollarSign },
    { title: 'Average Attendance', value: '94%', change: '-2.1%', icon: Calendar },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your school.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <div className="h-10 w-10 rounded-lg bg-[#0A1F44]/10 flex items-center justify-center text-[#0A1F44]">
                <metric.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
            <p className="text-sm text-green-600 mt-1">{metric.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { title: 'New student registered: Wanjiru Muthoni', time: '5 minutes ago' },
              { title: 'Fee payment received: KES 45,000', time: '1 hour ago' },
              { title: 'Exam results for Form 4 published', time: '3 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#0A1F44]/90">
              ➕ Admit Student
            </button>
            <button className="w-full text-left px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90">
              📊 View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
