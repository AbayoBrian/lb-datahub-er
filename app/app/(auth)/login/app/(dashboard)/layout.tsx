'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, UserCog, BookOpen, Calendar, ClipboardCheck, FileText, DollarSign, MessageSquare, Library, Package, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'

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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-[#0A1F44] flex items-center justify-center">
                <span className="text-white font-bold text-sm">LB</span>
              </div>
              <div>
                <span className="font-bold text-[#0A1F44] text-sm">DataHub</span>
                <span className="text-[10px] text-gray-500 block">School ERP</span>
              </div>
            </div>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1 rounded-lg hover:bg-gray-100">
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
                  isActive ? 'bg-[#0A1F44] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center gap-3 ${collapsed && 'justify-center'}`}>
            <div className="h-10 w-10 rounded-full bg-[#0A1F44]/10 flex items-center justify-center text-[#0A1F44] font-bold">AU</div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@lbdatahub.com</p>
              </div>
            )}
            <button className="p-1 rounded-lg hover:bg-gray-100"><LogOut size={18} /></button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'}`}>
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
