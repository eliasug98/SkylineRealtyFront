// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaStar } from 'react-icons/fa'; // Importar un ícono de Font Awesome
// import { useAuth } from '../hooks/useAuth';

// export default function Blog() {

//     const posts = [
//         {
//             title: "Transform Your Living Space with Modern Furniture",
//             date: "Monday, 26 September 2024",
//             author: "John Doe",
//             content: "Discover how modern furniture can elevate your living space and enhance your lifestyle. With sleek designs and functional pieces, you can create an inviting atmosphere that reflects your personal style.",
//             image: "https://iili.io/dpHOjyX.jpg",
//             url: "/blog/1"
//         },
//         {
//             title: "Choosing the Right Dining Table for Your Home",
//             date: "Tuesday, 27 September 2024",
//             author: "Jane Smith",
//             content: "A dining table is often the centerpiece of your home. Learn how to choose the perfect dining table that fits your space, style, and needs.",
//             image: "https://iili.io/dpHO0ZJ.webp",
//             url: "/blog/2"
//         },
//         {
//             title: "Creating a Cozy Bedroom Retreat",
//             date: "Wednesday, 28 September 2024",
//             author: "Emily Johnson",
//             content: "Transform your bedroom into a cozy retreat with the right furniture choices. Explore tips for selecting comfortable beds and stylish nightstands.",
//             image: "https://iili.io/dpHOfY7.webp",
//             url: "/blog/3"
//         }
//     ];

//     const comments = [
//         { name: "Alice", text: "Great selection of furniture! My living room looks amazing now!", image: "https://iili.io/dpHOZnj.png" },
//         { name: "Bob", text: "Excellent service and quality products. Highly recommend this store!", image: "https://iili.io/dpHOmFV.png" },
//         { name: "Charlie", text: "I found the perfect dining table here. Very satisfied with my purchase!", image: "https://iili.io/dpHOD6Q.jpg" }
//     ];

//     const latestNews = [
//         {
//             title: "New Collection Launch!",
//             content: "Discover our latest collection of modern furniture that combines style and functionality. Perfect for any living space!",
//             image: "https://iili.io/dpHOOjs.webp"
//         },
//         {
//             title: "Sustainable Furniture Options",
//             content: "Explore our range of eco-friendly furniture made from sustainable materials. Make a positive impact on the environment while enhancing your home.",
//             image: "https://iili.io/dpHOM4p.jpg"
//         },
//         {
//             title: "Exclusive In-Store Events",
//             content: "Join us for our upcoming in-store events where you can meet designers and learn tips on how to style your home with our furniture.",
//             image: "https://iili.io/dpHOGGR.jpg"
//         }
//     ];

//     return (
//         <>
//             <div className='relative'>
//                 <img className='w-full h-[60vh] object-cover' src='https://iili.io/dpHO9hG.jpg' alt="" />
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-lg bg-black bg-opacity-60">
//                     <h1 className="text-4xl mb-4 text-center font-bold">B L O G</h1>
//                 </div>
//             </div>
//             <p className='text-sm h-64'>
//                 <Link to="/" className='text-slate-700'>HOME</Link> /
//                 <span className='text-slate-500'> BLOG</span>
//             </p>
//             <h2 className='text-4xl flex justify-center font-light uppercase mb-6'>From Concept to Comfort: Exploring Modern Furniture Solutions</h2>
//             <div className="max-w-6xl mx-auto p-6">

//                 {posts.map((post, index) => (
//                     <div key={index} className="flex flex-col sm:flex-row mb-12 border rounded-lg shadow-xl overflow-hidden">
//                         <div className="relative w-full sm:w-1/2 group">
//                             <img
//                                 src={post.image}
//                                 alt={post.title}
//                                 className="w-full h-96 object-cover transition duration-300 ease-in-out group-hover:brightness-75" // Darken on hover
//                             />
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 <Link to={post.url} className="svg-container opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                                     {/* SVG Icon */}
//                                     <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF" className="transition-transform duration-300 transform scale-100 group-hover:scale-125">
//                                         <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
//                                     </svg>
//                                 </Link>
//                             </div>
//                         </div>
//                         <div className="p-8 w-full sm:w-1/2">
//                             <h2 className="text-4xl font-extralight">{post.title}</h2>
//                             <p className="text-gray-600 text-base mt-2">{post.date} by {post.author}</p>
//                             <p className="mt-4 text-xl font-thin">{post.content}</p>
//                             <div className="h-12"></div> {/* Add space at the bottom */}
//                         </div>
//                     </div>
//                 ))}

//                 <div className='flex flex-col md:flex-row'> {/* Cambiar a flex-col en pantallas pequeñas */}
//                     {/* User Comments Section */}
//                     <div className="mt-12 w-full md:w-2/4"> {/* Cambiar a w-full en pantallas pequeñas */}
//                         <h3 className="text-xl font-semibold mb-4">What Our Customers Say</h3>
//                         <div className='border-b-4 border-b-lime-600 w-20 mb-8'></div>
//                         {comments.map((comment, index) => (
//                             <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-6 transition-transform transform hover:-translate-y-[2px] hover:shadow-xl flex items-start">
//                                 <FaStar className="text-yellow-500 mr-2" />
//                                 <img className='w-12 h-12 m-2' src={`${comment.image}`} alt="" />
//                                 <div>
//                                     <p className="font-bold text-lg text-gray-800">{comment.name}</p>
//                                     <p className="text-gray-600 mt-2">{comment.text}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Latest News Section */}
//                     <div className="mt-12 w-full md:w-1/4 ml-auto"> {/* Cambiar a w-full en pantallas pequeñas */}
//                         <h3 className="text-xl font-semibold mb-4">Latest News</h3>
//                         <div className='border-b-4 border-b-lime-600 w-20 mb-8'></div>
//                         <div className="grid grid-cols-1 gap-4"> {/* Cambiar a una columna */}
//                             {latestNews.map((news, index) => (
//                                 <div key={index} className="bg-slate-50 p-4 transition-transform transform hover:-translate-y-[2px] hover:shadow-lg flex flex-col lg:flex-row items-start"> {/* Cambiar md a lg */}
//                                     <img className='h-24 w-24 mb-2 lg:mb-0 lg:mr-4' src={`${news.image}`} alt="" /> {/* Ajustar tamaño de la imagen y margen a la derecha */}
//                                     <div className="flex flex-col"> {/* Contenedor para el texto */}
//                                         <h3 className="text-md lg:text-lg font-light text-gray-800 mb-1">{news.title}</h3> {/* Tamaño de texto más pequeño en pantallas pequeñas */}
//                                         <p className="text-gray-600 text-sm font-extralight">{news.content}</p> {/* Tamaño de texto más pequeño */}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </>
//     );
// }