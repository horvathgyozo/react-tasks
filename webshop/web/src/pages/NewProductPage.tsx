import { useId } from 'react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import type { Product } from '../types'

const placeholderImageUrl =
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'

export function NewProductPage() {
  const formId = useId()

  const previewProduct: Product = {
    id: 'preview',
    name: 'New coffee',
    priceHuf: 0,
    imageUrl: placeholderImageUrl,
    description: 'Short coffee description…',
  }

  return (
    <div className="space-y-4">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>New product</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <ProductCard
            product={previewProduct}
            showActions={false}
          />
        </div>

        <div className="card bg-base-100 shadow lg:col-span-3">
          <div className="card-body">
            <div className="flex items-center justify-between gap-3">
              <h1 className="card-title text-2xl">New product</h1>
              <span className="badge badge-primary badge-outline">Coffee</span>
            </div>

            <div className="divider my-2" />

            <form
              id={formId}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                console.log('TODO: implement controlled inputs (Lesson 1)')
              }}
            >
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  className="input input-bordered w-full"
                  name="name"
                  required
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Price</span>
                  <span className="label-text-alt opacity-70">HUF</span>
                </div>
                <input
                  className="input input-bordered w-full"
                  inputMode="numeric"
                  name="priceHuf"
                  required
                />
              </label>

              <label className="form-control sm:col-span-2">
                <div className="label">
                  <span className="label-text">Image URL</span>
                  <span className="label-text-alt opacity-70">
                    empty = placeholder
                  </span>
                </div>
                <input
                  className="input input-bordered w-full"
                  placeholder={placeholderImageUrl}
                  name="imageUrl"
                />
              </label>

              <label className="form-control sm:col-span-2">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea
                  className="textarea textarea-bordered w-full min-h-32"
                  name="description"
                  required
                />
              </label>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                <button type="reset" className="btn">
                  Reset
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

