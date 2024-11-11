import React, { useEffect, useState } from 'react';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

export default function AdminChat() {
    const { user } = useAuth({ middleware: 'admin' });
    const [selectedUserId, setSelectedUserId] = useState(null); // Almacena el ID del usuario seleccionado
    const [newMessage, setNewMessage] = useState('');
    const { getMessages, messages, handleSendMessage, users, markMessagesAsRead } = useSkyline();

    // Cargar todos los mensajes al montar el componente
    useEffect(() => {
        getMessages();

    }, []);
    console.log(messages, 'messages');
    // Función para manejar el envío de mensajes
    const sendMessage = async () => {
        try {
            const messageData = { content: newMessage, userId: selectedUserId }; // Ajusta según tu estructura de datos
            await handleSendMessage(messageData);
            setNewMessage('');
            getMessages(); // Refresca la lista de mensajes después de enviar uno nuevo
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const messageReaded = (msg) => {
        console.log(msg, 'msg');

        if (msg.isRead == false) {
            markMessagesAsRead(msg.userId);
            getMessages();
        }
    }

    // Filtrar mensajes para obtener solo el último mensaje por usuario
    const getLastMessages = () => {
        const lastMessagesMap = new Map();

        messages.forEach(msg => {
            if (!lastMessagesMap.has(msg.userId) || new Date(msg.createdAt) > new Date(lastMessagesMap.get(msg.userId).createdAt)) {
                lastMessagesMap.set(msg.userId, msg);
            }
        });

        return Array.from(lastMessagesMap.values());
    };

    const lastMessages = getLastMessages(); // Obtener solo los últimos mensajes

    return (
        <div className="flex">
            {/* Lista de conversaciones */}
            <div className='w-1/3 h-96 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50'>
                <h2 className="font-bold mb-2">Conversations</h2>
                {lastMessages.map(msg => {
                    const user = users.find(user => user.id === msg.userId);
                    return (
                        <div
                            key={msg.id}
                            className={`mb-2 p-2 rounded-lg cursor-pointer ${msg.isRead ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300`}
                            onClick={() => { setSelectedUserId(msg.userId), messageReaded(msg) }} // Seleccionar usuario al hacer clic
                        >
                            <strong>{user ? user.username : 'Unknown user'}:</strong>
                            <span className="block font-medium">{msg.content}</span>
                        </div>
                    )
                })}
            </div>

            {/* Chat activo */}
            <div className='flex flex-col w-2/3 ml-4'>
                {selectedUserId && (
                    <>
                        <div className='h-96 overflow-y-auto border border-gray-300 rounded-lg p-4 bg-gray-50'>
                            {/* Mostrar mensajes del usuario seleccionado */}
                            {messages.filter(msg => msg.userId === selectedUserId).map(msg => {
                                const client = users.find(user => user.id === msg.userId);
                                return (
                                    <div key={msg.id} className={`mb-2 p-2 rounded-lg max-w-xs ${msg.adminId !== 0 ? 'bg-blue-100 ml-auto' : 'bg-green-100 text-left mr-auto'}`}>
                                        <strong className='text-left'>{msg.adminId !== 0 ? user.username : client.username}:</strong>
                                        <span className='block font-medium text-left'>{msg.content}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex mt-4'>
                            <textarea
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type your answer here..."
                                className='w-full p-3 border resize-none border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-indigo-200'
                            />
                            <img onClick={sendMessage} src="/img/send.svg" className='w-12 cursor-pointer' alt="" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}