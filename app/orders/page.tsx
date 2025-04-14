import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrdersComponent from "@/components/ui/OrdersComponent";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMyOrders } from "@/sanity/helpers/queries";
import jwt from "jsonwebtoken";
import { FileX } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const secret = process.env.JWT_SECRET || "my_super_secret_jwt_key_42501"; // Use environment variable for JWT secret

const OrdersPage = async () => {
  const cookieStore = cookies(); // Get cookies using next/headers
  const token = cookieStore.get("token")?.value; // Get token value safely

  if (!token) {
    return <div>You are not logged in!</div>;
  }

  try {
    const decoded: any = jwt.decode(token);
    const userId = decoded?.userId;

    if (!userId) {
      console.error('No userId found in token:', decoded);
      return <div>No userId found in token!</div>;
    }

    console.log('Fetching orders for userId:', userId);
    // Fetch orders and ensure it's always an array
    const orders = (await getMyOrders(userId)) || [];
    console.log('Fetched orders:', orders);

    return (
      <div className="py-10 ">
        {orders.length > 0 ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">
                Orders List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-auto">Order Number</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden sm:table-cell">Email</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Invoice Number</TableHead>
                    </TableRow>
                  </TableHeader>
                  <OrdersComponent orders={orders}/>
                  <ScrollBar orientation="horizontal"/>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-5 md:py-10 px-4">
            <FileX className="h-24 w-24 text-gray-400 mb-4" />
            <CardTitle className="text-2xl font-semibold">
              No orders found
            </CardTitle>
            <p className="mt-2 text-sm text-gray-600 text-center max-w-md">
              It looks like you haven&apos;t placed any orders yet. Start
              shopping to see your orders here!
            </p>
            <Button asChild className="mt-6">
              <Link href={"/"}>Browse Products</Link>
            </Button>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return <div>There was an error fetching your orders</div>;
  }
};

export default OrdersPage;
