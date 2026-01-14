import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiShield, FiTruck, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import styles from './About.module.css';
import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import essenceBg from '../../assets/localexterior.jpg'; // Reutilizamos el banner de lujo

const About = () => {
    return (
        <div className={styles.aboutPage}>
            {/* Hero Section */}
            <div className={styles.hero} style={{ backgroundImage: `url(${essenceBg})` }}>
                <div className={styles.overlay}></div>
                <motion.div
                    className={styles.heroContent}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Nuestra Esencia</h1>
                    <p>Más que una perfumería, una experiencia de lujo y confianza.</p>
                </motion.div>
            </div>

            <div className="container">
                {/* Quiénes Somos Section */}
                <section className={styles.section}>
                    <div className={styles.grid}>
                        <motion.div
                            className={styles.imageWrapper}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img src={image1} alt="Local Al Vuelo Importados - Interior" />
                            <div className={styles.imageDecor}></div>
                        </motion.div>
                        <motion.div
                            className={styles.textContent}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <span className={styles.tag}>SOBRE NOSOTROS</span>
                            <h2>Expertos en Alta Perfumería</h2>
                            <p>
                                En <strong>Al Vuelo Importados</strong>, nos dedicamos a traer lo mejor de la perfumería mundial directamente a tus manos.
                                Nacimos con la visión de conectar a Argentina con las fragancias más exclusivas de Medio Oriente y el mundo.
                            </p>
                            <p>
                                No somos solo una tienda virtual; somos un equipo de apasionados por los aromas, comprometidos con la autenticidad y la excelencia.
                                Cada botella que ofrecemos ha sido seleccionada cuidadosamente para garantizar que recibas un producto 100% original y de la más alta calidad.
                            </p>

                            <div className={styles.featuresList}>
                                <div className={styles.feature}>
                                    <FiCheckCircle className={styles.icon} />
                                    <span>Importadores Directos</span>
                                </div>
                                <div className={styles.feature}>
                                    <FiCheckCircle className={styles.icon} />
                                    <span>Garantía de Originalidad</span>
                                </div>
                                <div className={styles.feature}>
                                    <FiCheckCircle className={styles.icon} />
                                    <span>Atención Personalizada</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Confianza & Local Section */}
                <section className={`${styles.section} ${styles.reversed}`}>
                    <div className={styles.grid}>
                        <motion.div
                            className={styles.textContent}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className={styles.tag}>NUESTRA GARANTÍA</span>
                            <h2>Un Negocio Real y Confiable</h2>
                            <p>
                                Entendemos que comprar online requiere confianza. Por eso, queremos que sepas quiénes somos.
                                Contamos con una estructura sólida y profesional dedicada a brindarte el mejor servicio.
                            </p>
                            <p>
                                Nuestro compromiso va más allá de la venta; buscamos construir relaciones duraderas con nuestros clientes.
                                Desde el asesoramiento inicial hasta que el paquete llega a tu puerta, estamos presentes para asegurarnos de que tu experiencia sea impecable.
                            </p>

                            <div className={styles.stats}>
                                <div className={styles.statItem}>
                                    <h3>+5000</h3>
                                    <p>Clientes Felices</p>
                                </div>
                                <div className={styles.statItem}>
                                    <h3>100%</h3>
                                    <p>Calificaciones Positivas</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className={styles.imageWrapper}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <img src={image2} alt="Local Al Vuelo Importados - Exhibición" />
                            <div className={styles.imageDecorReversed}></div>
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section className={styles.valuesSection}>
                    <motion.div
                        className={styles.valueCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.valueIcon}><FiAward /></div>
                        <h3>Calidad Premium</h3>
                        <p>Solo trabajamos con productos auténticos y sellados. La excelencia es innegociable.</p>
                    </motion.div>
                    <motion.div
                        className={styles.valueCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className={styles.valueIcon}><FiShield /></div>
                        <h3>Seguridad Total</h3>
                        <p>Tus compras están protegidas. Operamos con total transparencia y respaldo.</p>
                    </motion.div>
                    <motion.div
                        className={styles.valueCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.valueIcon}><FiTruck /></div>
                        <h3>Envíos a todo el País</h3>
                        <p>Llegamos a cada rincón de Argentina con embalajes seguros y tiempos rápidos.</p>
                    </motion.div>
                </section>
            </div>
        </div>
    );
};

export default About;
