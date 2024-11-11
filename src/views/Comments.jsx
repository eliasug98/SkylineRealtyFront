import React, { useEffect, useState } from 'react';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

export default function Comments() {
    const { handleApproveComment, allComments, handleGetAllComments } = useSkyline();
    const { user } = useAuth({ middleware: 'Admin' });

    // Estado para el propertyId de búsqueda
    const [searchPropertyId, setSearchPropertyId] = useState('');
    const [filteredComments, setFilteredComments] = useState(allComments);
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 4;

    useEffect(() => {
        handleGetAllComments();
    }, []);

    useEffect(() => {
        // Filtrar comentarios cuando allComments o searchPropertyId cambian
        if (searchPropertyId) {
            setFilteredComments(
                allComments.filter(comment => comment.propertyId.toString() === searchPropertyId)
            );
        } else {
            setFilteredComments(allComments);
        }
    }, [searchPropertyId, allComments]);

    // Calcular los comentarios a mostrar en la página actual
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

    const totalPages = Math.ceil(filteredComments.length / commentsPerPage);

    const updateComment = async (commentId) => {
        const success = await handleApproveComment(commentId);
        if (success) {
            handleGetAllComments();
        }
    };

    return (
        <div className="mt-12 mx-20">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <div className='border-b-4 border-b-lime-600 w-20 mb-8'></div>

            {/* Campo de búsqueda para propertyId */}
            <input 
                type="text" 
                placeholder="Search by Property ID" 
                value={searchPropertyId} 
                onChange={(e) => setSearchPropertyId(e.target.value)} 
                className="border p-2 rounded mb-4 xl:w-1/5"
            />

            {currentComments.map((comment, index) => (
                <div key={index} className={`bg-white p-4 rounded-lg shadow-lg mb-6 transition-transform transform hover:-translate-y-[2px] hover:shadow-xl flex items-start justify-between ${!comment.isActive ? 'opacity-50 border border-red-500' : ''}`}>
                    <div className="flex items-start">
                        <img className={`w-20 h-20 rounded-full m-2 ${!comment.isActive ? 'opacity-50' : ''}`} src={`${comment.user.profilePicture}`} alt="" />
                        <div>
                            <div className='flex gap-2'>
                                <p className={`font-bold text-lg ${!comment.isActive ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{comment.user.firstName}</p>
                                <p className={`font-bold text-lg ${!comment.isActive ? 'text-gray-400 line-through' : 'text-gray-800'}`}>{comment.user.lastName}</p>
                            </div>

                            <p className={`text-gray-600 mt-2 ${!comment.isActive ? 'line-through text-gray-400' : ''}`}>{comment.content}</p>
                        </div>
                    </div>

                    {/* Imagen de desaprobación */}
                    <img onClick={() => updateComment(comment.id)} src="/img/approve.svg" className='w-12 cursor-pointer' alt="Approve" />
                </div>
            ))}

            {/* Controles de paginación */}
            <div className="flex justify-between mt-4">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}