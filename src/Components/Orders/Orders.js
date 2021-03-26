import React, { useState, useEffect } from 'react';
import db, { auth } from '../../firebase';
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { uid } = auth.currentUser;

  useEffect(() => {
    const unsubscribe = db.collection('orders')
      .where('sellerId', '==', uid)
      .orderBy('order_date', 'desc')
      .onSnapshot(snap => setOrders(snap.docs.map(doc => 
        ({ 
          id: doc.id, 
          ...doc.data(),
          order_date: doc.data().order_date.toDate().toString().slice(0, 24) 
        })
      )))

    return () => {
      unsubscribe();
    }
  }, [uid]);

  return (
    <div className='orders products'>   
      <div className="modal-content mx-auto">
        <div className="modal-header">
          <h4>Orders</h4>
          <div className="products__search">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </div>
        <div className="modal-body" style={{ height: "400px", overflow: "auto" }}>
          <table className="productsTable table table-striped table-hover">
            <thead>
              <tr className="table-dark">
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Title</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.order_date}</td>
                  <td>{order.title}</td>
                  <td>{order.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Orders;