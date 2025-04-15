export interface Order {
    _id: string;
    orderNumber: string;
    user: {
      _ref: string;
      name?: string; // Optional if you’re populating this from your query
    };
    customerName: string;
    email: string;
    total: number;
    status: 'pending' | 'completed' | 'cancelled';
    stripeId: string;
    invoiceId?: string;
    invoiceNumber?: string;
    invoiceUrl?: string;
    invoicePdf?: string;
    createdAt: string;
    items: {
      product: {
        _ref: string;
        name?: string;
        price?: number;
      };
      quantity: number;
    }[];
  }
  