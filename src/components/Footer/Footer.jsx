import React from 'react';
import { FiInstagram, FiFacebook, FiYoutube, FiMessageCircle } from 'react-icons/fi';
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
                            Importadora directa de perfumes árabes y de nicho. Especialistas en ventas mayoristas y envíos a toda la Argentina.
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
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/productos">Perfumes</a></li>
                            <li><a href="/combos">Ofertas y Combos</a></li>
                            <li><a href="/faq">Preguntas Frecuentes</a></li>
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
                    <p>&copy; {new Date().getFullYear()} Al Vuelo Importados. Importadora de Perfumes.</p>
                    <div className={styles.dev}>
                        Expert SEO by <span className={styles.gold}>Antigravity Luxury</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
