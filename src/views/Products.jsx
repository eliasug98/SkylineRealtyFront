
import useSkyline from '../hooks/useSkyline'
import { useAuth } from '../hooks/useAuth';

export default function Products() {

  const { products, handleClickModal } = useSkyline();
  useAuth({ middleware: 'admin' });

  return (
    <div>
      {/* <h1 className='text-4xl font-black'>Products</h1>
      <div className='flex items-center'>
        <p className='text-2xl my-10'>
          Manage availability from here.
        </p>
        <button onClick={handleClickModal} className="bg-indigo-600 hover:bg-indigo-800 rounded m-8 h-1/2 text-white w-1/4 mt-5 p-3 uppercase font-bold">
          Add Product
        </button>
      </div>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {products.map(product => (
          <Product
            key={product.image}
            product={product}
            botonDisponible={true}
          />
        ))}
      </div> */}
    </div>
  )
}
