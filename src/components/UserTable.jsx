import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const UserTable = ({ users, loading, onEdit, onDelete, onSort, sortConfig }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                    <tr>
                        {/* Added cursor-pointer to all TH tags */}
                        <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition" onClick={() => onSort('id')}>ID</th>
                        <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition" onClick={() => onSort('firstName')}>First Name</th>
                        <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition" onClick={() => onSort('lastName')}>Last Name</th>
                        <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition" onClick={() => onSort('email')}>Email</th>
                        <th className="px-6 py-4 cursor-pointer hover:text-blue-600 transition" onClick={() => onSort('department')}>Department</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {loading ? (
                        <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-400">Loading users...</td></tr>
                    ) : users.map(user => (
                        <tr key={user.id} className="hover:bg-blue-50/30 transition">
                            <td className="px-6 py-4 font-medium text-gray-900">#{user.id}</td>
                            <td className="px-6 py-4">{user.firstName}</td>
                            <td className="px-6 py-4">{user.lastName}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                    {user.department}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right flex justify-end gap-3">
                                {/* Added cursor-pointer to action buttons */}
                                <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-800 p-1 cursor-pointer">
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;