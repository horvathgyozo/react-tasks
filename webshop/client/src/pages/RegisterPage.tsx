import { Link } from 'react-router-dom'

export function RegisterPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="card bg-base-100 shadow lg:col-span-2">
          <figure className="aspect-[4/3] overflow-hidden bg-base-200">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
              alt="Coffee"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-lg">Create an account</h2>
            <p className="text-sm opacity-70">
              Lesson 2: connect this form to the API and store the token.
            </p>
            <div className="mt-2 text-xs opacity-70">
              Suggested password rule (optional): 8+ chars.
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow lg:col-span-3">
          <div className="card-body">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="mt-1 text-sm opacity-70">
                  Already have an account?{' '}
                  <Link to="/login" className="link link-primary">
                    Login
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
                  autoComplete="new-password"
                  required
                />
              </label>

              <div className="sm:col-span-2 flex items-center justify-end gap-2 pt-2">
                <Link to="/" className="btn">
                  Cancel
                </Link>
                <button className="btn btn-primary" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

