import React, { useState, useEffect, useRef } from 'react';
import './UpdateProduct.css';
import db, { auth, storage } from '../../../firebase';
import ImageUploader from './ImageUploader';
import TagsInput from '../TagsInput';

function UpdateProduct({ product }) {
  return (
    <div>
      <ProductForm product={product} />
    </div>
  )
}

export default UpdateProduct;



function ProductForm({ product }) {
  const initialState = {
    title: '', 
    description: '', 
    tags: [], 
    stock: '',   // units_in_stock
    price: '',
    category: '',
    images: [],
    deleteQueue: [],    // should hold urls of images for delete from db. AND SHOULD BE REMOVED BEFORE COMITTING STATE TO DB.
    imagesUploaded: false,
  };
  const [state, setState] = useState(initialState);
  const [originalProduct, setOriginalProduct] = useState({});         // store the original product info., to revert back onCancel.
  const [shouldUploadImgs, setShouldUploadImgs] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const closeBtn = useRef();
  const categories = ['Appliances', 'Apps & Game s', 'Baby', 'Beauty', 'Books', 'Car & Motorbike', 'Clothing & Accessories', 'Collectibles', 'Computers & Accessories', 'Electronics', 'Furniture', 'Garden & Outdoors', 'Grocery & Gourmet Foods', 'Health & Personal Care', 'Home & Kitchen', 'Industrial & Scientific', 'Jewellery', 'Luggage & Bags', 'Movies & TV Shows', 'Music', 'Musical Instruments', 'Office Products', 'Pet Supplies', 'Shoes & Handbags', 'Software', 'Sports, Fitness & Outdoors', 'Tools & Home Improvement', 'Toys & Games', 'Watches'];   
  const uid = auth.currentUser.uid;  

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  } 

  const getImageURLs = urls => {        // get image urls array from the ImageUploader Component.
    setState({ 
      ...state,                                       // spread state.
      images: [...state.images, ...urls],             // append new image urls to state.
      imagesUploaded: true,
    });
  }

  const resetForm = () => {
    // console.log({...initialState, ...originalProduct});
    setState({...initialState, ...originalProduct});
  }

  const submit = (event) => {
    event.preventDefault();
    setShouldUploadImgs(true);   // enable uploading
    setIsDisabled(true);         // disable form input.
  }

  // console.log(state);
  // console.log(product);

  const deleteImages = async () => {
    const promises = state.deleteQueue.map(url => storage.refFromURL(url).delete());

    return Promise.all(promises).then(() => {
      setState({ 
        ...state,  
        deleteQueue: []
      })
    });
  }

  useEffect(() => {   // for execution at component mount.    RESET FORM ON MODAL CLOSE.
    const modalCloseBtn = document.querySelector('#updateProductModal .btn-close');
    modalCloseBtn.addEventListener('click', resetForm);
    return () => {
      modalCloseBtn.removeEventListener('click', resetForm)
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {                                           // this effect executes everytime the value of product changes. Think of it as a class constructor.
    if(product){
      setOriginalProduct(product);                            // preserve a copy of the product
      setState(prevState => ({ ...prevState, ...product}));   // set product to state.
    }
  }, [product]);

  useEffect(() => {
    /** STEPS
     * 0. upload new images (if any)
     * 1. delete from deleteQueue
     * 2. update product in db.
     */

    if(state.imagesUploaded){
      console.log('images uploaded');
      deleteImages()
        .then(() => {
          console.log('images deleted');
          const { id, title, description, tags, stock, price, category, images } = state;
          return db.doc(`products/${id}`)
            .update({ title, description, tags, stock, price, category, images, sellerId: uid })           // add new product to db
        })
        .then(() => {                     // on success
          setIsDisabled(false);           // enable the fields
          setState(initialState);         // reset state
          closeBtn.current.click();       // close the modal.
          console.log('uploaded')
        })
        .catch(err => console.error(err))
    }
    // eslint-disable-next-line
  }, [state.imagesUploaded]);

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
            state={state}
            setState={setState}
          />
        </div>
        <div className="modal-footer m-0 p-0 py-1">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeBtn} onClick={resetForm} disabled={isDisabled}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isDisabled}>Update</button>
        </div>
        
      </form>
    </div>
  )
}

