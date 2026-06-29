import React, { useState, useEffect } from 'react';
import { validateForm } from '../utils/validators';

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    });
    const [errors, setErrors] = useState({});

    // Pre-populate data if we are editing an existing user
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                department: user.department || ''
            });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl transform transition-all">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {user ? 'Update User Details' : 'Create New User'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                            <input
                                type="text"
                                className={`w-full border p-3 rounded-xl outline-none transition ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                            {errors.firstName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                            <input
                                type="text"
                                className={`w-full border p-3 rounded-xl outline-none transition ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                            {errors.lastName && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                        <input
                            type="email"
                            className={`w-full border p-3 rounded-xl outline-none transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label>
                        <input
                            type="text"
                            className={`w-full border p-3 rounded-xl outline-none transition ${errors.department ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-blue-500'}`}
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                        />
                        {errors.department && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.department}</p>}
                    </div>

                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                        <button 
                            type="button" 
                            onClick={onCancel} 
                            className="px-6 py-2.5 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 cursor-pointer transition active:scale-95"
                        >
                            {user ? 'Save Changes' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;