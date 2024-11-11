import useSkyline from "../hooks/useSkyline";
import { toast } from 'react-toastify';

export default function DeletePropertyModal() {
    const { handleClickModal, handleDeleteProperty, propertyId } = useSkyline();

    const deleteProperty = async () => {

        const success = await handleDeleteProperty(propertyId);
        if (success) {
            toast.success('Property deleted');
            handleClickModal(); // Cerrar modal después de actualizar
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    return (
        <div>
            <h1 className='font-bold text-2xl p-8'>Delete Property ?</h1>
            <div className="flex items-center justify-center gap-8 mt-8 p-6">
                <button className='text-teal-700 hover:text-teal-950 text-xl font-semibold' type="button" onClick={deleteProperty}>Confirm</button>
                <button className='text-red-700 hover:text-red-950 text-xl font-semibold' type="button" onClick={handleClickModal}>Cancel</button>
            </div>
        </div>
    );
}