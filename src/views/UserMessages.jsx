import React from 'react'
import UserChat from '../components/UserChat'
import { useAuth } from '../hooks/useAuth';
import useSkyline from '../hooks/useSkyline';
import { useEffect } from 'react';

export default function UserMessages() {

  const {user} = useAuth({ middleware: 'auth' });
  useAuth({ middleware: 'guest' });
  const {markMessagesAsRead, getUserMessages, userMessages} = useSkyline();

  useEffect(() => {
    async function fetchData() {
      const data = await getUserMessages(user.id);
      
      if(data) {
        const unreadMessagesCount = data.filter(message => !message.isRead && message.adminId != 0); 
        if(unreadMessagesCount) {
          await markMessagesAsRead(unreadMessagesCount[0].userId);
        }
      }
    }
    fetchData();
  }, [user]);

  return (
    <div>
      <UserChat/>
    </div>
  )
}
