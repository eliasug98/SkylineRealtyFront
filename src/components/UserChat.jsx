import React, { useEffect, useState } from 'react';
import useSkyline from '../hooks/useSkyline';
import { useAuth } from '../hooks/useAuth';

export default function UserChat() {

    const { user } = useAuth({ middleware: 'auth' });
    const { getUserMessages, userMessages, handleSendMessage } = useSkyline();
    const [newMessage, setNewMessage] = useState('');

    // Llama a getUserMessages solo si user.id está disponible
    useEffect(() => {
        async function fetchData() {
            await getUserMessages(user.id);

        }
        fetchData();

    }, [user]);
    console.log(userMessages, 'userMessages');

    const sendMessage = async () => {
        try {
            const messageData = { content: newMessage }; // Ajusta según tu estructura de datos
            await handleSendMessage(messageData);
            setNewMessage('');
            getUserMessages(user.id); // Refresca la lista de mensajes
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className='flex flex-col items-center p-10'>
            <h1 className='font-bold text-3xl font-serif uppercase underline mb-2'>Contact Admins</h1>
            <div className='h-96 overflow-y-auto border w-2/3 border-gray-300 rounded-lg p-4 bg-gray-50'>
                {userMessages.map(msg => {
                    const isUserMessage = msg.adminId == 0; // Verifica si el mensaje es del usuario
                    return (
                        <div key={msg.id} className={`mb-2 p-2 rounded-lg ${isUserMessage ? 'bg-blue-100 ml-auto' : 'bg-green-100 text-left mr-auto'} max-w-xs`}>
                            <strong className={`${isUserMessage ? 'text-blue-600' : 'text-green-600'}`}>
                                {isUserMessage ? user.username : 'Admin'}:
                            </strong>
                            <span className='block font-medium'>{msg.content}</span>
                        </div>
                    )
                })}
            </div>
            <div className='flex mt-4 w-2/3'>
                <textarea
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type here..."
                    className='w-full p-3 border resize-none border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-indigo-200'
                />
                <img onClick={sendMessage} src="/img/send.svg" className='w-12 cursor-pointer' alt="" />
            </div>
        </div>
    );
}