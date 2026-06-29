import React from 'react';

const FilterPopup = ({ filters, setFilters, onClose }) => {
    // Handles individual input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Clears all filter fields
    const handleReset = () => {
        setFilters({
            firstName: '',
            lastName: '',
            email: '',
            department: ''
        });
    };

    return (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl p-5 z-50 text-left animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Filter Records</h3>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-800 text-lg cursor-pointer transition-colors"
                    title="Close"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                    <input
                        name="firstName"
                        value={filters.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-200 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Type first name..."
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                    <input
                        name="lastName"
                        value={filters.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-200 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Type last name..."
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
                    <input
                        name="email"
                        value={filters.email}
                        onChange={handleChange}
                        className="w-full border border-gray-200 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Type email..."
                    />
                </div>
                <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                    <input
                        name="department"
                        value={filters.department}
                        onChange={handleChange}
                        className="w-full border border-gray-200 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Type department..."
                    />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                    <button
                        onClick={handleReset}
                        className="w-full text-xs text-blue-600 font-bold py-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    >
                        Reset All Filters
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full bg-gray-900 text-white text-xs font-bold py-2.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer active:scale-95"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;