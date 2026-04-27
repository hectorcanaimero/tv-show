import { redirect } from 'next/navigation'
import { listActiveProducts, getCarouselIntervalSeconds } from '@/lib/products'
import { Carousel } from '@/components/tv/carousel'

export const dynamic = 'force-dynamic'

type SearchParams = Promise<{ start?: string }>

export default async function CarouselPage({ searchParams }: { searchParams: SearchParams }) {
  const { start } = await searchParams
  const items = await listActiveProducts()
  if (items.length === 0) redirect('/')

  const initialIndex = start ? Math.max(0, items.findIndex((p) => p.id === start)) : 0
  const intervalSeconds = await getCarouselIntervalSeconds()

  return <Carousel items={items} initialIndex={initialIndex} intervalSeconds={intervalSeconds} />
}
