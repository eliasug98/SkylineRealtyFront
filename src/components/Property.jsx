import { useState } from 'react';
import { formatearDinero } from "../helpers";
import useSkyline from "../hooks/useSkyline";

export default function Property({ product }) {
    const { handleClickProductoAgotado } = useSkyline();
    const { name, image, price } = product;

    // Estado para manejar si el producto está en stock
    const [inStock, setInStock] = useState(!product.available); // Asumiendo que "isCompleted" indica si está agotado

    const handleStockClick = async () => {
        const success = await handleClickProductoAgotado(product.id);
        if (success) {
            setInStock(!inStock); // Cambia el estado de inStock
        }
    };

    return (
        <div className="border p-3 shadow bg-white">
            <img
                alt={`imagen ${name}`}
                className="w-full"
                src={`${image}`}
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinero(price)}
                </p>

                <button
                    type="button"
                    className={`w-full mt-5 p-3 uppercase font-bold ${inStock ? 'bg-red-600 hover:bg-red-800' : 'bg-indigo-600 hover:bg-indigo-800'} text-white`}
                    onClick={handleStockClick}
                >
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </button>
            </div>
        </div>
    );
}