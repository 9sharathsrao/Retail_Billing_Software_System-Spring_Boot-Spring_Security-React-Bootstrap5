import React, { useEffect, useState } from 'react'
import './ManageUsers.css'
import UserForm from '../../components/UserForm/UserForm'
import UsersList from '../../components/UsersList/UsersList'
import { fetchUsers } from './../../Service/UserService';
import toast from 'react-hot-toast';

const ManageUsers = () => {
// After creating the APIs in the userService we are gonna call or make an API call here by useEffect hook
  const[users, setUsers] = useState([])
  const[loading, setLoading] = useState(false)

  useEffect( () => {
    async function loadUsers(){
      try {
        setLoading(true)
        const response = await fetchUsers()
        setUsers(response.data)
      } catch (error) {
        console.error(error)
        toast.error("Unable to fetch user")        
      }finally{
        setLoading(false)
      }
    }
    loadUsers()
  }, [])




  return (
    <div className="users-container text-light">

      {/* user-form:- responsible for rendering the form*/}
      <div className="left-column">
        <UserForm setUsers={setUsers}/>
      </div>

      {/* user-list:- responsible for displaying the list of users  */}
      <div className="right-column">
        <UsersList users={users} setUsers={setUsers}/>
      </div>
    </div>
  )
}

export default ManageUsers