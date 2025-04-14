import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useOrdersStore } from '@/store'

export default function OrdersIcon() {
  const count = useOrdersStore((state) => state.count)

  return (
    <Link href="/orders" className="relative">
      <ShoppingBag className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  )
} 