import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroCarousel.module.css';

import hero1 from '../../assets/hero_luxury_perfume_1_1767885897767.png';
import hero2 from '../../assets/hero_luxury_perfume_2_1767885915087.png';
import hero3 from '../../assets/hero_luxury_perfume_3_1767885932327.png';
import principal from '../../assets/localexterior.jpg';

const images = [
    {
        url: hero1,
        title: 'Perfumes Árabes Importados',
        subtitle: 'Venta Mayorista y Minorista en Argentina'
    },

    {
        url: principal,
        title: 'Lattes & Oud: Calidad Premium',
        subtitle: 'Importadora directa de los Emiratos Árabes'
    },

    {
        url: hero2,
        title: 'Fragancias de Nicho Exclusivas',
        subtitle: 'El lujo de oriente ahora en San Miguel'
    },
    {
        url: hero3,
        title: 'Perfumería Mayorista San Miguel',
        subtitle: 'Distribuidores oficiales de Lattafa, Afnan y más'
    }
];

const HeroCarousel = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.carousel}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    className={styles.slide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                >
                    <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[index].url})` }}
                    />
                    <div className={styles.overlay} />
                    <div className={styles.content}>
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className={styles.tag}
                        >
                            Al Vuelo Importados
                        </motion.span>
                        <motion.h2
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className={styles.title}
                        >
                            {images[index].title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className={styles.subtitle}
                        >
                            {images[index].subtitle}
                        </motion.p>
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className={styles.ctaBtn}
                            onClick={() => window.dispatchEvent(new CustomEvent('openDiscountPopup'))}
                        >
                            ¿Tu primera vez? Gánate un cupón de 10% off
                        </motion.button>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className={styles.indicators}>
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.dot} ${index === i ? styles.active : ''}`}
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
