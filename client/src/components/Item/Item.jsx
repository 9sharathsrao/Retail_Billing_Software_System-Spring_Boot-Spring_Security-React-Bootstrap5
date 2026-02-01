import { useContext } from 'react'
import './Item.css'
import { AppContext } from '../../context/AppContext'

const Item = ({itemName, itemPrice, itemImage, itemId}) => {

    const {addToCart} = useContext(AppContext)
    const handleAddToCart = () => {
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity:1,
            itemId:itemId
        })
    }

    return(
        // Designing the item component 
        <div className='p-3 bg-dark rounded shadow-sm h-100 d-flex align-items-center item-card'>
            {/* NOTE:- To add the searchBox we have created a separate reusable component in Folder 'SearchBox'  */}
            {/* Creating the first coloumn :- item image */}
            <div style={{position: 'relative', marginRight:'15px'}}>
                <img src={itemImage} alt={itemName} className='item-image'/>
            </div>
            {/* Second Col  */}
            <div className='flex-grow-1 ms-2'>
                <h6 className='mb-1 text-light'>{itemName}</h6>
                {/* ctrl+alt+4 ---> Rupees symbol  */}
                <p className='mb-0 fw-bold text-light'>₹{itemPrice}</p>
            </div>
            {/* Third Col:- Display icon, incre and decre  */}
            <div className='d-flex flex-column justify-content-between align-items-center ms-3'
                style={{height:'100%'}}
            >
                {/* Bootstrap Icons  */}
                <i className='bi bi-cart-plus fs-4 text-warning'></i>
                {/* When clicked on add to cart it should get added to 'Cart Item' component  */}
                <button className='btn btn-success btn-sm' onClick={handleAddToCart}>
                    <i className='bi bi-plus'></i>
                </button>
            </div>
        </div>
    )
}
export default Item