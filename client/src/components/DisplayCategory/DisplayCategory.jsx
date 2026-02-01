import { assests } from '../../assets/assest'
import Category from '../Category/Category'
import './DisplayCategory.css'

const DisplayCategory = ({categories, selectedCategory, setSelectCategory}) => {
    return(
        // <div>Display Category</div>
        <div className='row g-3' style={{width: '100%', margin:0}}>
            <div key="all" className='col-md-3 col-sm-6' style={{padding:'0, 10px'}}>
                <Category
                    //Here we are passing a bunch of props
                    categoryName="All Items"
                    imgUrl={assests.device}
                    numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
                    bgColor="#6c757d"
                    //'is-selected' and 'onClick'
                    isSelected={selectedCategory === ""}
                    onClick={() => setSelectCategory("")}
                />
            </div>
            {categories.map(category =>(
                <div key={category.categoryId} className='col-md-3 col-sm-6' style={{padding:'0, 10px'}}>
                    <Category
                        //Here we are passing a bunch of props
                        categoryName={category.name}
                        imgUrl={category.imgUrl}
                        numberOfItems={category.items}
                        bgColor={category.bgColor}
                        //'is-selected' and 'onClick'
                        isSelected={selectedCategory === category.categoryId}
                        onClick={() => setSelectCategory(category.categoryId)}
                    />
                </div>
            ))}
        </div>
    )
}
export default DisplayCategory