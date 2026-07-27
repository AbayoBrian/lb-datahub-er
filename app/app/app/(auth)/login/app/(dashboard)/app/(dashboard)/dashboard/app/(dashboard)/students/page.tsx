'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Plus, Search } from 'lucide-react'

const mockStudents = Array.from({ length: 50 }, (_, i) => {
  const firstNames = ['Wanjiru', 'Odhiambo', 'Muthoni', 'Kamau', 'Achieng', 'Ochieng', 'Njeri', 'Kiprop', 'Chemtai', 'Okello']
  const lastNames = ['Kenyatta', 'Odinga', 'Kibaki', 'Ruto', 'Raila', 'Wamalwa', 'Moi', 'Kiprop', 'Ochieng']
  const classes = ['Form 1', 'Form 2', 'Form 3', 'Form 4']
  const streams = ['East', 'West', 'North', 'South']
  const statuses = ['Active', 'Active', 'Active', 'Active', 'Inactive', 'Graduated']

  return {
    id: `S${String(i + 1).padStart(4, '0')}`,
    admissionNumber: `2024-${String(i + 1).padStart(3, '0')}`,
    firstName: firstNames[i % firstNames.length],
    lastName: lastNames[i % lastNames.length],
    email: `student${i+1}@example.com`,
    currentClass: classes[i % classes.length],
    stream: streams[i % streams.length],
    status: statuses[i % statuses.length],
    feeBalance: Math.floor(Math.random() * 50000) - 10000,
  }
})

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.admissionNumber.includes(searchTerm)
    )
  }, [searchTerm])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all students in your school</p>
        </div>
        <Link href="/students/admission">
          <button className="px-4 py-2 bg-[#0A1F44] hover:bg-[#0A1F44]/90 text-white rounded-lg flex items-center gap-2">
            <Plus size={18} /> Admit Student
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: 'Total Students', value: mockStudents.length, color: '' },
          { label: 'Active', value: mockStudents.filter(s => s.status === 'Active').length, color: 'text-green-600' },
          { label: 'Inactive', value: mockStudents.filter(s => s.status === 'Inactive').length, color: 'text-yellow-600' },
          { label: 'Graduated', value: mockStudents.filter(s => s.status === 'Graduated').length, color: 'text-blue-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color || 'text-gray-900 dark:text-white'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
        <div className="relative max-w-md mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Student</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Admission No.</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Class</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Fee Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{s.firstName} {s.lastName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{s.email}</p>
                    </div>
                  </td>
                  <td className="py-3 text-gray-700 dark:text-gray-300">{s.admissionNumber}</td>
                  <td className="py-3 text-gray-700 dark:text-gray-300">{s.currentClass} - {s.stream}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      s.status === 'Active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : s.status === 'Inactive'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className={`py-3 font-medium ${
                    s.feeBalance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    KES {s.feeBalance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
