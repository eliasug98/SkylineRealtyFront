import { createRef, useEffect, useState } from 'react';
import useSkyline from "../hooks/useSkyline";
import { toast } from 'react-toastify';

export default function AdminProductModal() {
    const { handleClickModal, handleCreateProduct, categories } = useSkyline();

    const imageRef = createRef();
    const nameRef = createRef();
    const descriptionRef = createRef();
    const priceRef = createRef();
    // const categoryIdRef = createRef(); // Ref para almacenar el ID de la categoría

    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        if (!imageRef.current.value || !nameRef.current.value || !descriptionRef.current.value ||
            !priceRef.current.value || !selectedCategoryId) {
            setError('Please fill out all fields.');
            return; // Salir si hay campos vacíos
        }

        const data = {
            image: imageRef.current.value,
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: Number(priceRef.current.value),
            categoryId: Number(selectedCategoryId), // Usar el ID seleccionado
        };

        const success = await handleCreateProduct(data);
        if (success) {
            toast.success('Product created');
            handleClickModal(); // Cerrar modal después de actualizar
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                {error && <span className='text-red-600'>{error}</span>}
                    <div className='flex justify-between items-center gap-1 m-1'>
                        <label className='font-bold'>Image:</label>
                        <input className='border border-gray-300 rounded p-2 w-48' type="text" ref={imageRef} />
                    </div>
                    <div className='flex justify-between items-center gap-1 m-1'>
                        <label className='font-bold'>Name:</label>
                        <input className='border border-gray-300 rounded p-2 w-48' type="text" ref={nameRef} />
                    </div>
                    <div className='flex justify-between items-center gap-1 m-1'>
                        <label className='font-bold'>Description:</label>
                        <input className='border border-gray-300 rounded p-2 w-48' type="text" ref={descriptionRef} />
                    </div>
                    <div className='flex justify-between items-center gap-1 m-1'>
                        <label className='font-bold'>Price:</label>
                        <input className='border border-gray-300 rounded p-2 w-48' type='number' ref={priceRef} />
                    </div>
                    <div className='flex justify-between items-center gap-1 m-1'>
                        <label className='font-bold'>Category:</label>
                        <select
                            className='border border-gray-300 rounded p-2 w-48'
                            onChange={(e) => setSelectedCategoryId(e.target.value)} // Actualiza el estado con el ID seleccionado
                            value={selectedCategoryId}
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <input className='text-teal-700 hover:text-teal-950 cursor-pointer' type="submit" value='Save changes' />
                        <button className='text-red-700 hover:text-red-950' type="button" onClick={handleClickModal}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}