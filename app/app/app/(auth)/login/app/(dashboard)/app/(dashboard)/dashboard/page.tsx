'use client'

import { useEffect, useState } from 'react'
import { Users, UserCog, DollarSign, Calendar, TrendingUp, TrendingDown } from 'lucide-react'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const metrics = [
    { title: 'Total Students', value: '1,247', change: 12.5, trend: 'up', icon: Users },
    { title: 'Total Teachers', value: '86', change: 5.2, trend: 'up', icon: UserCog },
    { title: 'Monthly Revenue', value: 'KES 2.4M', change: 8.7, trend: 'up', icon: DollarSign },
    { title: 'Average Attendance', value: '94%', change: 2.1, trend: 'down', icon: Calendar },
  ]

  const activities = [
    { id: 1, title: 'New student registered: Wanjiru Muthoni', time: '5 minutes ago', type: 'student' },
    { id: 2, title: 'Fee payment received: KES 45,000', time: '1 hour ago', type: 'finance' },
    { id: 3, title: 'Exam results for Form 4 published', time: '3 hours ago', type: 'exam' },
    { id: 4, title: 'Teacher assigned: Mr. Ochieng to Mathematics', time: '5 hours ago', type: 'teacher' },
  ]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your school.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <div className="h-10 w-10 rounded-lg bg-[#0A1F44]/10 flex items-center justify-center text-[#0A1F44]">
                    <metric.icon size={20} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{metric.value}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-medium flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {metric.change}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">from last month</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[#0A1F44]/10 text-[#0A1F44] dark:bg-[#0A1F44]/30 dark:text-white capitalize">
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-[#0A1F44] text-white rounded-lg hover:bg-[#0A1F44]/90">
              ➕ Admit Student
            </button>
            <button className="w-full text-left px-4 py-2 bg-[#FF6B00] text-white rounded-lg hover:bg-[#FF6B00]/90">
              📊 View Reports
            </button>
            <button className="w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700">
              📚 Manage Library
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
