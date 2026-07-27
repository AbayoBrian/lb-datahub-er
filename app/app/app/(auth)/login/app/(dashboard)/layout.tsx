'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Users, UserCog, BookOpen, Calendar,
  ClipboardCheck, FileText, DollarSign, MessageSquare,
  Library, Package, BarChart3, Settings, LogOut,
  ChevronLeft, ChevronRight, Bell, Search, Sun, Moon
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/students', label: 'Students', icon: Users },
  { href: '/teachers', label: 'Teachers', icon: UserCog },
  { href: '/academics', label: 'Academics', icon: BookOpen },
  { href: '/attendance', label: 'Attendance', icon: Calendar },
  { href: '/assessments', label: 'Assessments', icon: ClipboardCheck },
  { href: '/examinations', label: 'Examinations', icon: FileText },
  { href: '/finance', label: 'Finance', icon: DollarSign },
  { href: '/communication', label: 'Communication', icon: MessageSquare },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col ${
          collapsed ? 'w-20' : 'w-64'
        }`}
        initial={{ width: 256 }}
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#0A1F44] flex items-center justify-center">
                <span className="text-white font-bold text-sm">LB</span>
              </div>
              <div>
                <span className="font-bold text-[#0A1F44] dark:text-white text-sm">DataHub</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 block">School ERP</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#0A1F44] text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon size={20} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className={`flex items-center gap-3 ${collapsed && 'justify-center'}`}>
            <div className="h-10 w-10 rounded-full bg-[#0A1F44]/10 dark:bg-[#0A1F44]/30 flex items-center justify-center text-[#0A1F44] dark:text-white font-bold">
              AU
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@lbdatahub.com</p>
              </div>
            )}
            <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Top Navigation */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              placeholder="Search anything..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0A1F44] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-8 rounded-full bg-[#0A1F44]/10 flex items-center justify-center text-[#0A1F44] font-bold">
              AU
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
