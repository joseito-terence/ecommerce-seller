import React, { useState, useEffect } from 'react';
import db, { auth, storage } from '../../../firebase';
import './ProductsTable.css';
import Modal from '../../Modal';
import ViewImages from './ViewImages';
import UpdateProduct from '../UpdateProduct';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);         // holds urls of images of a product to be previwed.
  const [productForUpdate, setProductForUpdate] = useState({});   // holds details of product to be updated.
  const uid = auth.currentUser.uid;  

  useEffect(() => {
    const unsubscribe = db.collection('products')
      .where('sellerId', '==', uid)
      .onSnapshot(snap => {
        setProducts(
          snap.docs.map((doc) => 
            ({ ...doc.data(), id: doc.id })
          )
        );
      })
    return () => {
      unsubscribe();
    }
  }, [uid]);

  const updateProduct = (product) => {
    setProductForUpdate(product);
  }

  const deleteProduct = (id, images) => {
    console.log(id);

    if(window.confirm('Do you want to delete?')){
      let promises = images.map(image => storage.refFromURL(image).delete());   // map all the promises into an array

      return Promise.all(promises).then(() => {         // execute once all promises are resolved.
        db.doc(`products/${id}`)                        // i.e delete the record from the database.
          .delete()
          .then(() => console.log('Delete Successful'))
          .catch(error => console.log(error));
      });
    }
  }

  return (
    <>
      <table className="productsTable table table-striped table-hover">
        <thead>
          <tr className="table-dark">
            <th>Product Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Tags</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td className='text-wrap'>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className='text-wrap'>{product.tags.map(tag => `${tag}, `)}</td>
              <td>
                <button 
                  onClick={() => setPreviewImages(product.images)} 
                  className='btn btn-secondary btn-sm'
                  data-bs-toggle="modal"
                  data-bs-target="#previewImagesModal"
                >
                  View
                </button>
              </td>
              <td>
                <button 
                  onClick={() => updateProduct(product)} 
                  className="btn btn-primary btn-sm me-1"  
                  data-bs-placement="top" 
                  title="Edit/Update"
                  data-bs-toggle="modal"
                  data-bs-target="#updateProductModal"
                > 
                  <i className="fas fa-pen"></i>
                </button>
                <button onClick={() => deleteProduct(product.id, product.images)} className="btn btn-danger btn-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Modal id='previewImagesModal' title='Images (Preview)' className='d-none'>
        <ViewImages images={previewImages} />
      </Modal>
      
      <Modal id='updateProductModal' title='Update/Edit Products' className='d-none'>
        <UpdateProduct product={productForUpdate} />
      </Modal>
          
    </>
  )
}

export default ProductsTable;
