import React from 'react';
import Modal from '../Modal';
import './Products.css';
import ProductsTable from './ProductsTable/';
import AddProducts from './AddProducts';
import searchTableAndFilter from '../../Utilities/searchTableAndFilter';

function Products() {
  const search = ({ target }) => {
    searchTableAndFilter(target.value);
  }

  return (
    <div className="products">
      <div className="modal-content mx-auto">
        <div className="modal-header">
          <h4>Products</h4>
          <div className="products__search">
            <input type="text" className="form-control" placeholder="Search..." onChange={search} />
          </div>
        </div>
        <div
          className="modal-body"
          style={{ height: "400px", overflow: "auto" }}
        >
          <ProductsTable />
        </div>

        <div className="modal-footer" style={{ padding: "10px" }}>
          <Modal 
            id='addProduct' 
            buttonText="Add a Product" 
            title=" Add a Product"
            buttonIcon='fas fa-plus'
          >
            <AddProducts />
          </Modal>
        </div>
      </div>
    </div> 
  )
}

export default Products;
