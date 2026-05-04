export function CartPage() {
  return (
    <div className="space-y-4">
      <div className="rounded-box bg-base-100 p-6 shadow">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">Cart</h1>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => alert('TODO: clear cart (Lesson 1)')}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="rounded-box bg-base-100 p-6 shadow">
        <p className="opacity-70">
         TODO (Lesson 1): show the cart contents from Zustand.

         {/* Example: display the first cart item with image */}
         <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
             <img
               src="https://via.placeholder.com/40"
               alt="Example Item Name"
               className="w-10 h-10 rounded"
             />
             <span>Example Item Name</span>
           </div>
           <span className="font-semibold">$9.99</span>
           <span>Qty: 1</span>
         </div>
   
    
        </p>
      </div>
    </div>
  )
}

