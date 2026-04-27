import { ProductForm } from '../product-form'
import { createProductAction } from '../../actions'

export default function NewProductPage() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-xl font-semibold">Nuevo producto</h1>
      <ProductForm action={createProductAction} submitLabel="Crear" />
    </div>
  )
}
