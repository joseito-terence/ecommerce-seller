import React, { useState } from 'react';
import ImageUploader from './ImageUploader';

function AddProducts() {
  const initialState = {
    title: '', 
    description: '', 
    tags: '', 
    stock: '',   // units_in_stock
    price: '',
  };
  const [state, setState] = useState(initialState);
  const [shouldUploadImgs, setShouldUploadImgs] = useState(false);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.id]: target.value })
  } 

  const setImageURLs = () => {
    console.log('setting img urls...');
  }

  const submit = (event) => {
    event.preventDefault();
    setShouldUploadImgs(true);
    console.log(state);
  }

  return (
    <div className='addProducts px-4 pt-4'>
      <form onSubmit={submit} method='post'>
        {/* TITLE */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="title">Title</label>
          <input type="text" id='title' className='form-control' value={state.title} onChange={handleChange} required/>
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="description">Description</label>
          <textarea type="text" id='description' className='form-control' rows='5' value={state.description} onChange={handleChange} required/>
        </div>
        
        {/* STOCK */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="stock">Stock</label>
          <input type="text" id='stock' className='form-control' value={state.stock} onChange={handleChange} required/>
        </div>

        {/* PRICE */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="price">Price</label>
          <input type="text" id='price' className='form-control' value={state.price} onChange={handleChange} required/>
        </div>

        {/* TAGS */}
        <div className="mb-3">
          <label className="text-end fs-5" htmlFor="tags">Tags</label>
          <textarea type="text" id='tags' className='form-control' value={state.tags} onChange={handleChange} required/>
        </div>

        {/* IMAGES - File Upload */}
        <div className="mb-3">
          <label className="text-end fs-5">Upload Images</label>
          <ImageUploader shouldUploadImgs={shouldUploadImgs} setImageURLs={setImageURLs} />
        </div>

        <div className="modal-footer m-0 p-0 py-1">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </div>
        
      </form>
    </div>
  )
}

export default AddProducts;
