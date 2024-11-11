import { Outlet } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';
import Footer from '../components/Footer';
import NavBarTop from '../components/NavBarTop';
import UserModal from '../components/UserModal';
import DeletePropertyModal from '../components/DeletePropertyModal';

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

export default function Layout() {

  const { userModal, modal } = useSkyline();

  return (
    <>
      <NavBarTop />
      <Navbar />
      <main className='w-full bg-gray-100'>
        <Outlet />

        <Footer />
      </main>

      <ToastContainer />

      <Modal isOpen={userModal} style={customStyles}>
        <UserModal />
      </Modal>

      <Modal isOpen={modal} style={customStyles}>
        <DeletePropertyModal />
      </Modal>
    </>
  )
}