import React from 'react';
import { FiInstagram, FiFacebook, FiYoutube, FiMessageCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Al Vuelo Importados",
        "image": "https://alvueloimportados.com/logo.png",
        "@id": "https://alvueloimportados.com",
        "url": "https://alvueloimportados.com",
        "telephone": "+5491122921805",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Tribulato 999",
            "addressLocality": "San Miguel",
            "addressRegion": "Buenos Aires",
            "postalCode": "1663",
            "addressCountry": "AR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -34.5422,
            "longitude": -58.7122
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "20:00"
        },
        "sameAs": [
            "https://www.instagram.com/alvueloimportados"
        ]
    };

    return (
        <footer className={styles.footer}>
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <h2 className={styles.logo}>Al Vuelo Importados</h2>
                        <p className={styles.desc}>
                            Perfumeria especializada en fragancias arabes, nacionales y nicho. Nos dedicamos a la venta minorista y mayorista con envios a todo el pais.
                        </p>
                        <div className={styles.social}>
                            <a href="https://www.instagram.com/alvueloimportados" target="_blank" rel="noopener noreferrer" title="Seguinos en Instagram"><FiInstagram /></a>
                            <a href="#" aria-label="Facebook"><FiFacebook /></a>
                            <a href="#" aria-label="YouTube"><FiYoutube /></a>
                        </div>
                    </div>

                    <div className={styles.links}>
                        <h3>Catálogo</h3>
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/productos">Perfumes</Link></li>
                            <li><Link to="/combos">Ofertas y Combos</Link></li>
                            <li><Link to="/nosotros">Nosotros</Link></li>
                            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>

                    <div className={styles.contact}>
                        <h3>Contacto Local San Miguel</h3>
                        <ul>
                            <li>Tribulato 999, San Miguel</li>
                            <li>Buenos Aires, Argentina</li>
                            <li>info@alvueloimportados.com</li>
                            <li>+54 9 11 2292 1805</li>
                        </ul>
                        <a
                            href="https://wa.me/5491122921805"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.whatsapp}
                        >
                            <FiMessageCircle /> <span>WhatsApp Mayorista</span>
                        </a>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Al Vuelo Importados. Perfumeria Minorista & Mayorista</p>
                    <div className={styles.dev}>
                        Expert Design by <span className={styles.gold}>Factos Dev</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
