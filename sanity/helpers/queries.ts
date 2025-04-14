import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";


// Fetch product by slug
export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == 'product' && slug.current == $slug] | order(name asc) [0]`
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching by product Slug:", error);
  }
};


export const getMyOrders = async (userId: string) => {
  if (!userId) {
    console.error('No userId provided to getMyOrders');
    throw new Error("User ID is required");
  }

  console.log('Executing query for userId:', userId);
  const MY_ORDERS_QUERY = defineQuery(
    `*[_type == 'order' && user._ref == $userId] | order(createdAt desc) {
      _id,
      orderNumber,
      customerName,
      user->{
        name,
        email
      },
      email,
      total,
      status,
      stripeId,
      invoiceId,
      invoiceNumber,
      invoiceUrl,
      invoicePdf,
      items[] {
        quantity,
        product->{
          _id,
          name,
          price,
          images
        }
      },
      createdAt
    }`
  );

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: {
        userId,
      },
    });

    console.log('Sanity query result:', orders);
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};
