import { Outlet } from 'react-router-dom'
import AdminSidebar from "../components/AdminSidebar";
import Modal from 'react-modal'
import AdminProductModal from '../components/AdminProductModal';
import AdminUserModal from '../components/AdminUserModal';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

Modal.setAppElement('#root')

export default function AdminLayout() {

    // useAuth({middleware: 'admin'});
    const { modal, userModal, categoryModal } = useSkyline();

    return (
        <div className='md:flex'>
            <AdminSidebar />

            <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
                <Outlet />
            </main>

            <Modal isOpen={modal} style={customStyles}>
                <AdminProductModal />
            </Modal>

            <Modal isOpen={userModal} style={customStyles}>
                <AdminUserModal />
            </Modal>

        </div>
    )
}