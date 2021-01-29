import React from 'react';
import './ProductsTable.css';

function ProductsTable() {
  return (
    <table className="productsTable table table-striped table-hover">
      <thead>
        <tr className="table-dark">
          <th>Product Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0126a5df05a6d5f0</td>
          <td>Panasonic 584 L</td>
          <td>Panasonic 584 L Inverter Frost-Free Side by Side...</td>
          <td>59,990.00</td>
          <td>20</td>
          <td>Panasonic 584L, Refrigerator...</td>
          <td>
            
            <button className="btn btn-primary me-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit/Update"> 
              <i className="fas fa-pen"></i>
            </button>
            <button className="btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default ProductsTable;
