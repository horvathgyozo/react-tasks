import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="card bg-base-100 shadow lg:col-span-2">
          <figure className="aspect-[4/3] overflow-hidden bg-base-200">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80"
              alt="Coffee"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg">Welcome</h2>
            <p className="text-sm opacity-70">
              Lesson 2: connect this form to the API.
            </p>
          </div>
        </div>

        <div className="card bg-base-100 shadow lg:col-span-3">
          <div className="card-body">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="mt-1 text-sm opacity-70">
                  Don’t have an account?{' '}
                  <Link to="/register" className="link link-primary">
                    Register
                  </Link>
                </p>
              </div>
              <span className="badge badge-primary badge-outline">Coffee</span>
            </div>

            <div className="divider my-2" />

            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                console.log('TODO: implement controlled inputs (Lesson 2)')
              }}
            >
              <label className="form-control sm:col-span-2">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  className="input input-bordered w-full"
                  name="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="form-control sm:col-span-2">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  className="input input-bordered w-full"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                />
              </label>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Link to="/" className="btn">
                  Cancel
                </Link>
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

