import type { Product } from '@/lib/db/schema'

type Props = {
  action: (formData: FormData) => Promise<void>
  submitLabel: string
  defaultValues?: Partial<Product>
}

export function ProductForm({ action, submitLabel, defaultValues }: Props) {
  return (
    <form action={action} className="grid grid-cols-2 gap-5">
      <Field label="Nome" name="name" required defaultValue={defaultValues?.name} full />
      <Field
        label="URL da imagem"
        name="imageUrl"
        type="url"
        required
        defaultValue={defaultValues?.imageUrl}
        full
      />
      <Field
        label="URL do item (a que vai ao iframe)"
        name="productUrl"
        type="url"
        required
        defaultValue={defaultValues?.productUrl}
        full
      />
      <label className="col-span-2 flex flex-col text-sm text-zinc-700">
        Descrição
        <textarea
          name="description"
          rows={4}
          defaultValue={defaultValues?.description ?? ''}
          className="mt-1 rounded-md border border-zinc-300 px-3 py-2"
        />
      </label>

      <Field
        label="Ordem"
        name="orderIndex"
        type="number"
        defaultValue={String(defaultValues?.orderIndex ?? 0)}
      />
      <label className="flex items-center gap-2 self-end text-sm text-zinc-700">
        <input
          type="checkbox"
          name="active"
          defaultChecked={defaultValues?.active ?? true}
          className="h-4 w-4"
        />
        Ativo (visível na TV)
      </label>

      <div className="col-span-2 flex justify-end gap-3 pt-4">
        <button
          type="submit"
          className="rounded-md bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  defaultValue,
  full,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  defaultValue?: string | null
  full?: boolean
}) {
  return (
    <label className={`flex flex-col text-sm text-zinc-700 ${full ? 'col-span-2' : ''}`}>
      {label}
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className="mt-1 rounded-md border border-zinc-300 px-3 py-2"
      />
    </label>
  )
}
