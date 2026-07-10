import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiChevronDown, FiPercent, FiDroplet } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useToast } from '../Toast/Toast';
import { formatCurrency } from '../../utils/currencyFormatter';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, viewMode = 'grid', isExpanded, onToggleAccordion }) => {
    const { addToCart } = useCart();
    const { convertToARS, calculateSuggestedPrice } = useCurrency();
    const { addToast } = useToast();

    const handleAddToCart = () => {
        addToCart(product, 'product', selectedSize);
        const sizeText = selectedSize ? ` (${selectedSize}ml)` : '';
        addToast(`${product.nombre}${sizeText} agregado al carrito`, 'cart');
    };

    // Use internal state as fallback when external control is not provided
    const [internalExpanded, setInternalExpanded] = useState(false);
    const [selectedSize, setSelectedSize] = useState(product.sellType === 'decant' ? product.decantOptions?.sizes[0]?.size : null); // null means full bottle

    // Determine if using controlled or uncontrolled mode
    const isControlled = isExpanded !== undefined && onToggleAccordion !== undefined;
    const showBulkPrices = isControlled ? isExpanded : internalExpanded;

    const handleToggle = () => {
        if (isControlled) {
            onToggleAccordion();
        } else {
            setInternalExpanded(prev => !prev);
        }
    };

    const imageUrl = Array.isArray(product.imagenes) && product.imagenes.length > 0
        ? product.imagenes[0]
        : (typeof product.imagenes === 'string' ? product.imagenes : 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=500');

    const isList = viewMode === 'list';
    const hasBulkPrices = product.bulkPrices && product.bulkPrices.length > 0;

    // Get the best discount for display
    const bestDiscount = hasBulkPrices
        ? Math.max(...product.bulkPrices.map(bp => ((product.precio - bp.price) / product.precio * 100)))
        : 0;

    const currentPrice = selectedSize
        ? product.decantOptions?.sizes.find(s => s.size === selectedSize)?.price
        : product.precio;

    const currentStock = selectedSize
        ? product.decantOptions?.sizes.find(s => s.size === selectedSize)?.stock
        : product.stock;

    const hasDecants = (product.sellType === 'both' || product.sellType === 'decant') && product.decantOptions?.available;
    const decantSizes = product.decantOptions?.sizes || [];

    return (
        <motion.div
            className={`${styles.card} ${isList ? styles.listCard : ''}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.imageWrapper}>
                <img
                    src={imageUrl}
                    alt={product.nombre}
                    className={styles.image}
                    loading="lazy"
                />
                {product.stock <= 0 && <div className={styles.outOfStock}>Agotado</div>}
                {hasBulkPrices && (
                    <div className={styles.bulkBadge}>
                        <FiPercent /> Hasta -{Math.round(bestDiscount)}%
                    </div>
                )}


                {/* Cart Button Overlay */}
                <div className={styles.imageOverlay}>
                    <button
                        className={styles.cartBtn}
                        onClick={handleAddToCart}
                        disabled={currentStock <= 0}
                        title="Agregar al carrito"
                    >
                        <FiShoppingCart />
                        <span>Agregar</span>
                    </button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.info}>
                    <p className={styles.brand}>{product.categoria}</p>
                    <h3 className={styles.name}>{product.nombre}</h3>
                </div>

                <div className={styles.priceContainer}>
                    <div className={styles.prices}>
                        <div className={styles.priceRow}>
                            <span className={styles.priceLabel}>
                                {selectedSize ? `DECANT ${selectedSize}ML:` : 'MAYORISTA:'}
                            </span>
                            <span className={styles.price}>{formatCurrency(convertToARS(currentPrice))}</span>
                        </div>
                        <div className={styles.suggestedRow}>
                            <span className={styles.suggestedLabel}>SUGERIDO MINORISTA:</span>
                            <span className={styles.suggestedAmount}>{formatCurrency(convertToARS(calculateSuggestedPrice(currentPrice)))}</span>
                        </div>
                    </div>
                </div>

                {hasDecants && (
                    <div className={styles.sizeSelector}>
                        <p className={styles.sizeLabel}>
                            <FiDroplet className={styles.sizeLabelIcon} />
                            Elegí tu presentación:
                        </p>
                        <div className={styles.sizeGrid}>
                            {product.sellType === 'both' && (
                                <button
                                    className={`${styles.sizeBtn} ${styles.sizeBtnFull} ${selectedSize === null ? styles.sizeBtnActive : ''}`}
                                    onClick={() => setSelectedSize(null)}
                                    disabled={product.stock <= 0}
                                >
                                    <span className={styles.sizeBtnLabel}>Frasco Completo</span>
                                    <span className={styles.sizeBtnPrice}>{formatCurrency(convertToARS(product.precio))}</span>
                                </button>
                            )}
                            <div className={styles.decantOptions}>
                                {decantSizes.map((s) => (
                                    <button
                                        key={s.size}
                                        className={`${styles.sizeBtn} ${selectedSize === s.size ? styles.sizeBtnActive : ''}`}
                                        onClick={() => setSelectedSize(s.size)}
                                        disabled={s.stock <= 0}
                                    >
                                        <span className={styles.sizeBtnLabel}>{s.size}ml</span>
                                        <span className={styles.sizeBtnPrice}>{formatCurrency(convertToARS(s.price))}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bulk Pricing Accordion */}
                {hasBulkPrices && (
                    <div className={styles.bulkSection}>
                        <button
                            className={`${styles.bulkToggle} ${showBulkPrices ? styles.bulkToggleOpen : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggle();
                            }}
                        >
                            <span className={styles.bulkToggleText}>
                                📦 Descuentos por cantidad
                            </span>
                            <FiChevronDown className={styles.bulkChevron} />
                        </button>

                        <AnimatePresence>
                            {showBulkPrices && (
                                <motion.div
                                    className={styles.bulkPricesContainer}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                >
                                    <div className={styles.bulkPricesList}>
                                        <div className={styles.bulkHeader}>
                                            <span>Cantidad</span>
                                            <span>Precio</span>
                                            <span>Ahorro</span>
                                        </div>
                                        {product.bulkPrices
                                            .sort((a, b) => a.minQuantity - b.minQuantity)
                                            .map((bp, index) => {
                                                const savings = ((product.precio - bp.price) / product.precio * 100).toFixed(0);
                                                return (
                                                    <div key={index} className={styles.bulkPriceItem}>
                                                        <div className={styles.bulkQty}>
                                                            <span className={styles.bulkQtyNumber}>{bp.minQuantity}+</span>
                                                        </div>
                                                        <div className={styles.bulkPriceInfo}>
                                                            <span className={styles.bulkPriceValue}>
                                                                {formatCurrency(convertToARS(bp.price))}
                                                            </span>
                                                        </div>
                                                        <div className={`${styles.bulkSavings} ${Number(savings) >= 10 ? styles.bulkSavingsHigh : ''}`}>
                                                            -{savings}%
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* List mode cart button */}
                {isList && (
                    <button
                        className={styles.listCartBtn}
                        onClick={handleAddToCart}
                        disabled={currentStock <= 0}
                    >
                        <FiShoppingCart />
                        <span>Agregar</span>
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default ProductCard;
