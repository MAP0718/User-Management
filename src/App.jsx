import React, { useState, useEffect, useMemo } from 'react';
import * as userService from './api/userService';
import UserForm from './components/UserForm';
import FilterPopup from './components/FilterPopup';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import { Search, Filter, Plus } from 'lucide-react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Initial Fetch - Runs on every page refresh
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const res = await userService.getUsers();
      // Data Mapping: Split 'name' into First/Last and use Company for Department
      const mappedData = res.data.map(u => ({
        id: u.id,
        firstName: u.name.split(' ')[0] || '',
        lastName: u.name.split(' ').slice(1).join(' ') || '',
        email: u.email,
        department: u.company?.name || 'General'
      }));
      setUsers(mappedData);
      setError(null);
    } catch (err) {
      setError("Unable to connect to the User API. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEdit = async (formData) => {
    try {
      if (selectedUser) {
        try {
          await userService.updateUser(selectedUser.id, formData);
        } catch (apiErr) {
          console.warn("Mock API does not support updates for local IDs > 10");
        }
        setUsers(users.map(u => u.id === selectedUser.id ? { ...formData, id: u.id } : u));
      } else {
        try {
          await userService.createUser(formData);
        } catch (apiErr) {
          console.warn("Mock API add failed; managing locally");
        }
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        setUsers([...users, { ...formData, id: newId }]);
      }
      setIsFormOpen(false);
      setSelectedUser(null);
    } catch (err) {
      alert("An error occurred while saving user data.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        try {
          await userService.deleteUser(id);
        } catch (apiErr) {
          console.warn("Mock API delete failed for local ID; removing from UI");
        }
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert("Error deleting user.");
      }
    }
  };

  // Numerical Sorting & Search
  const processedUsers = useMemo(() => {
    let result = users.filter(u => {
      const matchesSearch = (u.firstName + u.lastName + u.email).toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters =
        u.firstName.toLowerCase().includes(filters.firstName.toLowerCase()) &&
        u.lastName.toLowerCase().includes(filters.lastName.toLowerCase()) &&
        u.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        u.department.toLowerCase().includes(filters.department.toLowerCase());
      return matchesSearch && matchesFilters;
    });

    result.sort((a, b) => {
      if (sortConfig.key === 'id') {
        return sortConfig.direction === 'asc' ? a.id - b.id : b.id - a.id;
      }
      const valA = a[sortConfig.key]?.toString().toLowerCase() || '';
      const valB = b[sortConfig.key]?.toString().toLowerCase() || '';
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchTerm, filters, sortConfig]);

  const totalPages = Math.ceil(processedUsers.length / pageSize);
  const paginatedUsers = processedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">USER DASHBOARD</h1>
            <p className="text-sm text-gray-500">JSONPlaceholder API Integration</p>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search name or email..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full bg-white outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2 border rounded-lg bg-white cursor-pointer hover:bg-gray-50 ${isFilterOpen ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <Filter size={20} className={isFilterOpen ? 'text-blue-500' : 'text-gray-600'} />
              </button>
              {isFilterOpen && (
                <FilterPopup
                  filters={filters}
                  setFilters={(f) => { setFilters(f); setCurrentPage(1); }}
                  onClose={() => setIsFilterOpen(false)}
                />
              )}
            </div>

            <button
              onClick={() => { setSelectedUser(null); setIsFormOpen(true); }}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition cursor-pointer font-bold active:scale-95 shadow-md"
            >
              <Plus size={18} /> Add User
            </button>
          </div>
        </header>

        <main className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <UserTable
            users={paginatedUsers}
            loading={loading}
            onEdit={(u) => { setSelectedUser(u); setIsFormOpen(true); }}
            onDelete={handleDelete}
            onSort={(key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }))}
            sortConfig={sortConfig}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
          />
        </main>

        {error && <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl font-medium">{error}</div>}

        {isFormOpen && (
          <UserForm
            user={selectedUser}
            onSubmit={handleAddEdit}
            onCancel={() => { setIsFormOpen(false); setSelectedUser(null); }}
          />
        )}
      </div>
    </div>
  );
};

export default App;