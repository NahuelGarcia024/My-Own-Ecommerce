import { useMutation, useQueryClient} from "@tanstack/react-query";
import { useCartStore } from "../store/cart";
import { useState } from "react";
import {create_order} from "../api/orders";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";




const CartPage = () => {

    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeAll = useCartStore((state) => state.removeAll);
    

    const cart = useCartStore((state) => state.cart);
    const total_price = useCartStore((state) => state.totalPrice);

    const [address, setAddress] = useState<string>("");
    const [locality, setLocality] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postal_code, setPostal_code] = useState<string>("");

    const [phone_number, setPhone_number] = useState<string>("");

    
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const createOrderMut = useMutation({
        mutationFn: create_order,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success('Orden creada con exito');
            // delete all cart items in frontend
            removeAll();

            navigate('/');
        },
        onError: () => {
            toast.error('Error al hacer la orden');
             navigate('/');
        },
        });
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createOrderMut.mutate({ 
            order_items: cart,
            total_price: total_price,
            address: address,
            locality: locality,
            city: city,
            postal_code: postal_code,
            phone_number: phone_number,

           
            });
        
        };


   
        
    
   

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="relative mt-5 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                                <div className="flex items-center flex-1 space-x-4">
                                    <h5>
                                        <span className="text-gray-300 text-xl font-bold">
                                            Tenes {cart.length} productos en tu carrito 
                                        </span>
                                    </h5>
                                    <h5>
                                        <span className="text-gray-300 text-xl font-bold">
                                            Total: {total_price === null && "0"}{" "}
                                            $ {total_price}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Producto
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Categoria
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Cantidad
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Precio
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((product) => (
                                            <>
                                                <tr
                                                    key={product.id}
                                                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        <img
                                                            src={`http://127.0.0.1:8000${product.image}`}
                                                            alt={product.name}
                                                            className="w-auto h-8 mr-3"
                                                        />

                                                        {product.name}
                                                    </th>
                                                    <td className="px-4 py-2">
                                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                                                            {product.category}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div className="flex items-center space-x-3">
                                                            <button
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        product
                                                                    )
                                                                }
                                                                className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                                type="button"
                                                            >
                                                                <span className="sr-only">
                                                                    Quantity
                                                                    button
                                                                </span>
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    aria-hidden="true"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                                        clip-rule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                            <div>
                                                                {
                                                                    product.quantity
                                                                }
                                                                <input
                                                                    type="number"
                                                                    id="first_product"
                                                                    className="hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="1"
                                                                    required
                                                                />
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    addToCart(
                                                                        product
                                                                    )
                                                                }
                                                                className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                                type="button"
                                                            >
                                                                <span className="sr-only">
                                                                    Quantity
                                                                    button
                                                                </span>
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    aria-hidden="true"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                                        clip-rule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        ${product.price}
                                                    </td>

                                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        $ {product.quantity !== undefined ? product.price * product.quantity : 0}
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Detalles de facturación
            </h1>

            <h3 className="text text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Te vamos a estar contactando para gestionar el envío. <br /> Te vamos a solicitar DNI o factura que demuestre la misma dirección que ingresaste en tu orden.
            <br />

                    Al momento de concretar el pedido podes pagar en efectivo, MercadoPago, Cuenta de DNI u transferencia bancaria.
                
            </h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

            

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Región / Provincia *</label>
                <input 
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Provincia"/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Localidad</label>
                <input 
                onChange={(e) => setLocality(e.target.value)}
                value={locality}
                type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Localidad"/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dirección</label>
                <input 
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dirección"/>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Codigo Postal</label>
                <input 
                onChange={(e) => setPostal_code(e.target.value)}
                value={postal_code}
                type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Codigo Postal"/>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Whatsapp</label>
                <input 
                onChange={(e) => setPhone_number(e.target.value)}
                value={phone_number}
                type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Whatsapp"/>
              </div>
             
            <div className="ml-[180px]">
            
        </div>
        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Realizar el pedido</button>                                                   

            </form>
          </div>
                </div>
            </section>

        </>
    );
};

export default CartPage;