import React, { useState, useEffect, useRef } from 'react';
import db, { auth } from '../../../firebase';
import ImageUploader from './ImageUploader';
import TagsInput from '../TagsInput';
import { saveToIndex } from '../../../Utilities/indexing';

function AddProducts() {
  const initialState = {
    title: '', 
    description: '', 
    tags: [], 
    stock: '',   // units_in_stock
    price: '',
    category: '',
    images: [],
  };
  const [state, setState] = useState(initialState);
  const [shouldUploadImgs, setShouldUploadImgs] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const closeBtn = useRef();
  const categories = ['Appliances', 'Apps & Games', 'Baby', 'Beauty', 'Books', 'Car & Motorbike', 'Clothing & Accessories', 'Collectibles', 'Computers & Accessories', 'Electronics', 'Furniture', 'Garden & Outdoors', 'Grocery & Gourmet Foods', 'Health & Personal Care', 'Home & Kitchen', 'Industrial & Scientific', 'Jewellery', 'Luggage & Bags', 'Movies & TV Shows', 'Music', 'Musical Instruments', 'Office Products', 'Pet Supplies', 'Shoes & Handbags', 'Software', 'Sports, Fitness & Outdoors', 'Tools & Home Improvement', 'Toys & Games', 'Watches'];   
  const uid = auth.currentUser.uid;  

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  } 

  const getImageURLs = (urls) => {        // get image urls array from the ImageUploader Component.
    setState({ ...state, images: urls });
  }

  const submit = (event) => {
    event.preventDefault();
    setShouldUploadImgs(true);   // enable uploading
    setIsDisabled(true);         // disable form input.
  }

  //console.log(state);

  useEffect(() => {
    if(state.images.length !== 0){
      console.log('upload to firestore>>>',state);

      db.collection('products')
        .add({ ...state, price: Number(state.price), sellerId: uid })   // add new product to db
        .then(docRef => {                             // on success
          saveToIndex({ id: docRef.id, ...state })    // save product to index
          setIsDisabled(false);                       // enable the fields
          setState(initialState);                     // reset state
          closeBtn.current.click();                   // close the modal.
          console.log('uploaded')
        })
        .catch(err => console.log(err));
    }
    // eslint-disable-next-line
  }, [state.images])

  return (
    <div className='addProducts px-4 pt-4'>
      <form onSubmit={submit} method='post'>
        {/* TITLE */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="title">Title</label>
          <input type="text" name='title' className='form-control' value={state.title} onChange={handleChange} disabled={isDisabled} required/>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="description">Description</label>
          <textarea type="text" name='description' className='form-control' rows='5' value={state.description} onChange={handleChange} disabled={isDisabled} required/>
        </div>
        
        {/* STOCK */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="stock">Stock</label>
          <input type="text" name='stock' className='form-control' value={state.stock} onChange={handleChange} disabled={isDisabled} required
          pattern='^\d+$' title='Only Numbers allowed.' />
        </div>

        {/* PRICE */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="price">Price</label>
          <input type="text" name='price' className='form-control' value={state.price} onChange={handleChange} disabled={isDisabled} 
          pattern='^\d+(\.\d{1,2})?$' title='Price can be formatted as 0.00'  required/>
        </div>

        {/* CATEGORIES */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="category">Category</label>
          <select name="category" className='form-select' value={state.category} onChange={handleChange}  disabled={isDisabled} required>
            <option value=''>Select Category</option>
            {categories.map(category => 
              <option key={category} value={category}>{category}</option>
            )}
          </select>
        </div>

        {/* TAGS */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="tags">Tags</label>
          <TagsInput isDisabled={isDisabled} state={state} setState={setState} />
        </div>

        {/* IMAGES - File Upload */}
        <div className="mb-3">
          <label className="text-end fs-5">Upload Images</label>
          <ImageUploader 
            shouldUploadImgs={shouldUploadImgs} 
            setShouldUploadImgs={setShouldUploadImgs} 
            isDisabled={isDisabled} 
            dispatchImageURLs={getImageURLs}
          />
        </div>
        <div className="modal-footer m-0 p-0 py-1">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeBtn}>Close</button>
          <button type="submit" className="btn btn-primary" disabled={isDisabled}>Add Product</button>
        </div>
        
      </form>
    </div>
  )
}

export default AddProducts;
