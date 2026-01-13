import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../../api/product.api';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Products.module.css';
import { FiSearch, FiGrid, FiList } from 'react-icons/fi';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [categoria, setCategoria] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [sort, setSort] = useState('nombre:asc');
    const [expandedProductId, setExpandedProductId] = useState(null); // Track which accordion is open
    const [categories, setCategories] = useState([]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getProducts({ search, categoria, sort });
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchAllCategories();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, categoria, sort]);

    // Handler to toggle accordion - only one open at a time
    const handleToggleAccordion = (productId) => {
        setExpandedProductId(prev => prev === productId ? null : productId);
    };

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>Venta Mayorista de Perfumes Árabes</h1>
                    <p className={styles.subtitle}>Explorá la colección completa de elixires árabes.</p>
                </header>
            </div>

            <section className={styles.controlsSection}>
                <div className={styles.controlsContainer}>
                    <div className={styles.searchWrapper}>
                        <div className={styles.searchBar}>
                            <FiSearch className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Buscar perfume (Lattafa, Asad, etc.)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    <div className={styles.filterGroup}>
                        <select
                            className={styles.sortSelect}
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="nombre:asc">Nombre (A-Z)</option>
                            <option value="precio:asc">Menor precio</option>
                            <option value="precio:desc">Mayor precio</option>
                        </select>

                        <select
                            className={styles.categorySelect}
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option value="">Todas las marcas</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <div className={styles.viewToggles}>
                            <button
                                className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                                onClick={() => setViewMode('grid')}
                                title="Vista Cuadrícula"
                            >
                                <FiGrid />
                            </button>
                            <button
                                className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                                onClick={() => setViewMode('list')}
                                title="Vista Lista"
                            >
                                <FiList />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <div className={styles.catalogLayout}>
                    <main className={styles.mainContent}>
                        {loading ? (
                            <div className={styles.loader}>Buscando esencias...</div>
                        ) : (
                            <div className={viewMode === 'grid' ? styles.grid : styles.list}>
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                            viewMode={viewMode}
                                            isExpanded={expandedProductId === product._id}
                                            onToggleAccordion={() => handleToggleAccordion(product._id)}
                                        />
                                    ))
                                ) : (
                                    <div className={styles.noResults}>
                                        <p>No se encontraron perfumes con estos criterios.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;
