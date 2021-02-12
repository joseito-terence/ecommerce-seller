import React, { useState, useEffect } from 'react';
import db, { auth, storage } from '../../../firebase';
import './ProductsTable.css';
import Modal from '../../Modal';
import ViewImages from './ViewImages/ViewImages';

function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
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
  }, []);

  const updateProduct = (id) => {
    // no idea how to implement this...
    // too complex.
    console.log(id);
  }

  const deleteProduct = (id, images) => {
    console.log(id);

    let promises = images.map(image => storage.refFromURL(image).delete());   // map all the promises into an array

    return Promise.all(promises).then(() => {         // execute once all promises are resolved.
      db.doc(`products/${id}`)                        // i.e delete the record from the database.
        .delete()
        .then(() => console.log('Delete Successful'))
        .catch(error => console.log(error));
    });

    
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
              <td className='text-truncate'>{product.description}</td>
              <td className='text-truncate'>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.tags.map(tag => `${tag}, `)}</td>
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
                <button onClick={() => updateProduct(product.id)} className="btn btn-primary btn-sm me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit/Update"> 
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
    </>
  )
}

export default ProductsTable;
