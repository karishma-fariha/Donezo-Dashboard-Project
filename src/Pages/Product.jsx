import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Tag, TrendingUp, ShoppingCart, Layers, Check, Trash2, Plus } from 'lucide-react';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/products', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const toggleCart = (productId) => {
        if (cart.includes(productId)) {
            setCart(cart.filter(id => id !== productId));
        } else {
            setCart([...cart, productId]);
        }
    };

    if (loading) return <div className="p-10 text-green-700 font-bold text-center animate-pulse">Loading Products...</div>;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-[#F7F7F7] p-4 md:p-6 min-h-screen"
        >
            {/* Header Section - Responsive Stack */}
            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-medium text-[#2E2E2E]">Product Catalog</h1>
                    <p className="text-[#C1C6C4] text-xs md:text-sm mt-1">Select a plan to power your workflow</p>
                </div>
                
                {/* Dynamic Cart Counter - Scaled for Mobile */}
                <motion.div 
                    key={cart.length}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 self-end sm:self-auto"
                >
                    <div className="relative">
                        <ShoppingCart size={18} className="text-green-900" />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cart.length}
                            </span>
                        )}
                    </div>
                    <span className="font-bold text-xs md:text-sm text-green-900">{cart.length} Items</span>
                </motion.div>
            </div>

            {/* Grid - 1 col on mobile, 2 on tablet, 4 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product, index) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        index={index} 
                        isInCart={cart.includes(product.id)}
                        onToggle={() => toggleCart(product.id)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const ProductCard = ({ product, index, isInCart, onToggle }) => {
    const isBestSeller = product.sales > 500;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white p-5 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border shadow-sm flex flex-col h-full relative group transition-all duration-500 ${
                isInCart ? 'border-green-900/30 ring-1 ring-green-900/10' : 'border-gray-100'
            }`}
        >
            <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-colors duration-300 ${
                    isInCart ? 'bg-green-900 text-white' : 'bg-gray-50 text-green-900'
                }`}>
                    {product.category === 'subscription' ? <Layers size={20} /> : <Package size={20} />}
                </div>
                {isBestSeller && (
                    <span className="bg-orange-50 text-orange-600 text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-orange-100">
                        Popular
                    </span>
                )}
            </div>

            <div className="flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-[#2E2E2E] mb-1">{product.name}</h3>
                <p className="text-[9px] md:text-[10px] text-[#C1C6C4] uppercase font-bold tracking-widest flex items-center gap-1 mb-4">
                    <Tag size={10} /> {product.category}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-2xl md:text-3xl font-bold text-[#2E2E2E]">${product.price}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 font-medium">/one-time</span>
                </div>
            </div>

            {/* TOGGLE BUTTON */}
            <button 
                onClick={onToggle}
                className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${
                    isInCart 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100' 
                    : 'bg-green-900 text-white hover:bg-green-800 shadow-lg shadow-green-900/20'
                }`}
            >
                <AnimatePresence mode="wait">
                    {isInCart ? (
                        <motion.div 
                            key="remove"
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <Trash2 size={16} /> Remove Option
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="add"
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                        >
                            <Plus size={16} /> Add to Cart
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>
        </motion.div>
    );
};

export default Product;