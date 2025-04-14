import { Order } from "@/types/order";

interface OrdersComponentProps {
  orders: Order[];
}

export default function OrdersComponent({ orders }: OrdersComponentProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order._id} className="px-4 py-4 sm:px-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Order #{order.orderNumber}
                </h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Customer Information</p>
                  <p className="text-sm text-gray-500">Name: {order.customerName}</p>
                  <p className="text-sm text-gray-500">Email: {order.email}</p>
                  <p className="text-sm text-gray-500">User: {order?.user?.name}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Details</p>
                  <p className="text-sm text-gray-500">Total: PKR {order?.total?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Stripe ID: {order.stripeId}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">Invoice Information</p>
                <p className="text-sm text-gray-500">Invoice ID: {order.invoiceId}</p>
                <p className="text-sm text-gray-500">Invoice Number: {order.invoiceNumber}</p>
                {order.invoiceUrl && (
                  <a 
                    href={order.invoiceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Invoice
                  </a>
                )}
                {order.invoicePdf && (
                  <a 
                    href={order.invoicePdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 ml-4"
                  >
                    Download PDF
                  </a>
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900">Items</p>
                <ul className="mt-2 space-y-2">
                  {order.items?.map((item: any, index: number) => (
                    <li key={index} className="text-sm text-gray-500">
                      {item.quantity}x {item.product?.name} - PKR {item.product?.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 