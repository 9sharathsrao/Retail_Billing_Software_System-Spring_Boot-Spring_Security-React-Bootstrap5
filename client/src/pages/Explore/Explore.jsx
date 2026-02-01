import React, { useContext, useState } from 'react'
import './Explore.css'
import { AppContext } from '../../context/AppContext'
import DisplayCategory from '../../components/DisplayCategory/DisplayCategory';
import DisplayItems from '../../components/DisplayItems/DisplayItems';
import CustomerForm from './../../components/CustomerForm/CustomerForm';
import CartItems from '../../components/CartItems/CartItems';
import CartSummary from './../../components/CartSummary/CartSummary';

const Explore = () => {
  const {categories, clearCart} = useContext(AppContext);

  //Below state used to add the animations for the individual category in the 'DisplayCategory'
  //And pass these two as props to 'DisplayCategory'
  const [selectedCategory, setSelectCategory] = useState("")

  //States for customer form
  const[customerName, setCustomerName] = useState("")
  const[mobileNumber, setMobileNumber] = useState("")


  const handlePostOrderCleanup = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart(); // This wipes the cart global state
  };
  
  return (
    <div className="explore-container text-light">


      <div className="left-column">
        <div className="first-row" style={{overflow:'auto'}}>
          {/* Categories */}
          <DisplayCategory 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectCategory={setSelectCategory}
          />
        </div>
        <hr className='horizontal-line'/>
        <div className="second-row" tyle={{overflow:'auto'}}>
          {/* Items  */}
          <DisplayItems selectedCategory={selectedCategory}/> 
        </div>
      </div>


      <div className="right-column d-flex flex-column">
        <div className='customer-form-container' style={{height:'15%'}}>
          {/* Customer_Form */}
          <CustomerForm
            customerName={customerName}
            mobileNumber={mobileNumber}
            setCustomerName={setCustomerName}
            setMobileNumber={setMobileNumber}
          />
        </div>
        

        <hr className='my-3 text-light'/>

        <div className='cart-items-container' style={{height:'55%', overflowY:'auto'}}>
          {/* Cart_Items */}
          <CartItems/>
        </div>

        <div className='cart-summary-container' style={{height:'30%'}}>
          {/* Cart_Summary */}
          <CartSummary
            customerName={customerName}
            mobileNumber={mobileNumber}
            setCustomerName={setCustomerName}
            setMobileNumber={setMobileNumber}
            handlePostOrderCleanup={handlePostOrderCleanup}
          />
        </div>
      </div>
      </div>
      // API calls into the component 
  )
}

export default Explore