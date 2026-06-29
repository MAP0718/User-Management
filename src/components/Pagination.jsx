import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange }) => {
    return (
        <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-50/30">
            <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>Show</span>
                <select 
                    className="border rounded px-2 py-1 outline-none cursor-pointer bg-white"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                >
                    {[10, 25, 50, 100].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
                <span>entries</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Page {currentPage} of {totalPages || 1}</span>
                <div className="flex gap-1">
                    <button 
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="p-2 border rounded hover:bg-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button 
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="p-2 border rounded hover:bg-white disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;