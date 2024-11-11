import React from 'react'
import AdminChat from '../components/AdminChat'
import useSkyline from '../hooks/useSkyline'
import { useEffect } from 'react';

export default function AdminMessages() {

  const { handleGetAllUsers } = useSkyline();

  useEffect(() => {
    handleGetAllUsers();
  }, [])

  return (
    <div>
      <AdminChat/>
    </div>
  )
}
