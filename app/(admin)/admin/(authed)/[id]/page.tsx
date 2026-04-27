import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/products'
import { ProductForm } from '../product-form'
import { updateProductAction } from '../../actions'

type Params = Promise<{ id: string }>

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) notFound()

  const action = updateProductAction.bind(null, id)

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-xl font-semibold">Editar item</h1>
      <ProductForm action={action} submitLabel="Salvar" defaultValues={product} />
    </div>
  )
}
