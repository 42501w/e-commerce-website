import { MY_ORDERS_QUERYResult } from "@/sanity.types";
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";

interface Props {
  order: MY_ORDERS_QUERYResult[number] | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog: FC<Props> = ({ order, isOpen, onClose }) => {
  if (!order) return null;

  const items = order?.items ?? [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-describedby="order-description" className="max-w-4xl max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Order Details - {order?.orderNumber}</DialogTitle>
        </DialogHeader>

        {/* Order Info */}
        <div className="mt-4 space-y-1">
          <p><strong>Customer:</strong> {order?.customerName}</p>
          <p><strong>Email:</strong> {order?.email}</p>
          <p><strong>Date:</strong> {order?.createdAt && new Date(order?.createdAt).toLocaleDateString()}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize text-green-600 font-medium">
              {order?.status}
            </span>
          </p>
          <p><strong>Invoice Number:</strong> {order?.invoiceNumber}</p>
          {order?.invoiceUrl && (
            <Button variant="outline" className="mt-2">
              <Link href={order?.invoiceUrl} target="_blank">Download Invoice</Link>
            </Button>
          )}
        </div>

        {/* Items Table */}
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-2">
                  {item?.product?.images?.[0] && (
                    <Image
                      src={urlFor(item.product.images[0]).url()}
                      alt="productImage"
                      width={50}
                      height={50}
                      className="border rounded-sm w-14 h-14 object-contain"
                    />
                  )}
                  {item?.product?.name && (
                    <p className="line-clamp-1">{item.product.name}</p>
                  )}
                </TableCell>
                <TableCell>{item?.quantity ?? "N/A"}</TableCell>
                <TableCell>
                  <PriceFormatter
                    className="text-black font-medium"
                    amount={(item?.product?.price ?? 0) * (item?.quantity ?? 1)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Total Price */}
        <div className="mt-6 text-right flex items-center justify-end">
          <div className="w-44 flex flex-col gap-1">
            <div className="w-full flex items-center justify-between">
              <strong>Total:</strong>
              <PriceFormatter
                amount={order?.total ?? 0}
                className="text-black font-bold"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
