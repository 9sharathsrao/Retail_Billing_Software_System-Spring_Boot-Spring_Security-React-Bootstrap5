import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { fetchDashboardData } from '../../Service/Dashboard'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
        const loadData = async() => {
      try {
        const response = await fetchDashboardData();
        // Check if response exists before accessing .data
        if (response && response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        toast.error("Backend is down or Token is invalid");
      } finally {
        setLoading(false);
      }
    }
    loadData()
  }, [])

  if (loading) {
    return <div className='loading'>Loading Dashboard..</div>
  }

  // If loading is finished but data is still null, show error
  if (!data) {
    return <div className='error'>Failed to load the dashboard data...</div>
  }

  return (
    <div className='dashboard-wrapper'>
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className='bi bi-currency-rupee'></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              {/* Added optional chaining and default value to prevent crash */}
              <p>₹{(data.todaySales || 0).toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className='bi bi-cart-check'></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="recent-orders-card">
          <h3 className='recent-orders-title'> {/* Fixed class name consistency */}
            <i className="bi bi-clock-history"></i>
            Recent Orders
          </h3>
          <div className="orders-table-container">
            <table className='orders-table'>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders && data.recentOrders.length > 0 ? (
                  data.recentOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId ? order.orderId.substring(0, 8) : 'N/A'}...</td>
                      {/* FIXED: Changed 'prerender' to 'order' */}
                      <td>{order.customerName || 'Guest'}</td>
                      <td>₹{(order.grandTotal || 0).toFixed(2)}</td>
                      <td>
                        <span className={`payment-method ${(order.paymentMethod || '').toLowerCase()}`}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${(order.paymentDetails?.status || '').toLowerCase()}`}>
                          {order.paymentDetails?.status || 'Pending'}
                        </span>
                      </td>
                      <td>
                        {order.createdAt ? new Date(order.createdAt).toLocaleString([], {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        }) : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>No recent orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard