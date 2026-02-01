import React from 'react'
import './ManageItems.css'
import ItemForm from '../../components/ItemForm/ItemForm'
import ItemList from '../../components/ItemList/ItemList'

const ManageItems = () => {
  return (
    <div className="items-container text-light">

      {/* Item-form */}
      <div className="left-column">
        <ItemForm/>
      </div>

      {/* Item-list */}
      <div className="right-column">
        <ItemList/>
      </div>
    </div>
  )
}

export default ManageItems