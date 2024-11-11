import { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';
// import useSWR, { mutate } from 'swr'

const SkylineContext = createContext();

const SkylineProvider = ({ children }) => {

    const [comments, setComments] = useState([]);
    const [allComments, setAllComments] = useState([]);
    const [properties, setProperties] = useState([]);
    const [userProperties, setUserProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState([]);
    const [modal, setModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const [propertyId, setPropertyId] = useState([]);

    const obtenerValorDolar = async () => {
        try {
            const { data } = await clienteAxios('/api/Dolar')
            return data
        } catch (error) {
            console.log(error);
        }
    }

    const getProperties = async () => {
        // const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/properties', {
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            })
            setProperties(data)
            console.log(data);

        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getProperties();
    }, [])

    const handleGetComments = async (id) => {
        // const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios(`/api/comments/${id}`, {
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            })
            setComments(data)
            console.log(data);

        } catch (error) {
            console.log(error)
        }
    }

    const handleGetAllComments = async () => {
        // const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios(`/api/comments`, {
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            })
            setAllComments(data)
            console.log(data);

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleClickUserModal = () => {
        setUserModal(!userModal)
    }

    const handleUpdateUser = async (data) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/users`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleUpdateProfilePicture = async (data) => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await clienteAxios.put('/api/users/image', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Image': data
                }
            })
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleApproveComment = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN')

        try {
            await clienteAxios.put(`/api/comments/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleDeleteUser = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.delete(`/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleDeleteProperty = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.delete(`/api/properties/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleGetAllUsers = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/users/all', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data);
            setUsers(data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleGetUserProperties = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/properties/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(data);
            setUserProperties(data)

        } catch (error) {
            console.log(error)
        }
    };

    const handleCreateProperty = async (data) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.post(`/api/properties`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleCreateComment = async (data) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.post(`/api/comments`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return true;
        } catch (error) {
            return error.response.data
        }
    }

    const getMessages = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const { data } = await clienteAxios('/api/messages', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessages(data); // Devuelve la lista de mensajes
        } catch (error) {
            console.error(error);
        }
    };

    const getUserMessages = async (userId) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        console.log(userId, 'userId provider');

        try {
            const { data } = await clienteAxios(`/api/messages/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            setUserMessages(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleSendMessage = async (message) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        console.log(message);

        try {
            await clienteAxios.post('/api/messages', message, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            return true;
        } catch (error) {
            console.error(error, 'errorr');
            return false;
        }
    };

    const markMessagesAsRead = async (userId) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.post(`/api/messages/markAsRead/${userId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            return true;
        } catch (error) {
            console.error(error, 'errorr');
            return false;
        }
    };

    return (
        <SkylineContext.Provider
            value={{
                properties,
                userProperties,
                comments,
                allComments,
                handleCreateProperty,
                handleDeleteProperty,
                handleCreateComment,
                modal,
                handleClickModal,
                handleClickUserModal,
                userModal,
                obtenerValorDolar,
                handleUpdateUser,
                handleUpdateProfilePicture,
                handleGetAllUsers,
                handleGetUserProperties,
                handleGetComments,
                handleGetAllComments,
                users,
                setUserId,
                userId,
                handleDeleteUser,
                getMessages,
                messages,
                getUserMessages,
                userMessages,
                handleSendMessage,
                markMessagesAsRead,
                propertyId,
                setPropertyId,
                
            }}
        >{children}</SkylineContext.Provider>
    )
}

export {
    SkylineProvider
}
export default SkylineContext