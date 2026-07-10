import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Store,
  Package,
  Gift,
  MessageCircle,
  Instagram,
  Facebook,
  MapPin,
  ExternalLink,
  LogIn,
  ArrowRight,
} from 'lucide-react';
import { linktreeConfig, STORE_PATH } from '../../config/siteMode';
import bg1 from '../../assets/alvuelo1.jpeg';
import bg2 from '../../assets/alvuelo2.jpeg';
import bg3 from '../../assets/alvuelo3.jpeg';
import logoSrc from '../../assets/LOGOBLANCO.png';
import styles from './Linktree.module.css';

const bgImages = [bg1, bg2, bg3];

const iconMap = {
  Store: Store,
  Package: Package,
  Gift: Gift,
  MessageCircle: MessageCircle,
  Instagram: Instagram,
  Facebook: Facebook,
  MapPin: MapPin,
};

const Linktree = () => {
  const { logo, title, subtitle, description, buttons, social } = linktreeConfig;
  const [searchParams] = useSearchParams();
  const [showLoginNotice, setShowLoginNotice] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    if (searchParams.get('openLogin') === 'true') {
      setShowLoginNotice(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const isExternal = (url) => url.startsWith('http');

  return (
    <div className={styles.page}>
      <div className={styles.bgContainer}>
        <AnimatePresence>
          <motion.img
            key={bgIndex}
            src={bgImages[bgIndex]}
            alt=""
            className={styles.bgImage}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>
      <div className={styles.overlay} />
      <div className={styles.content}>
        {showLoginNotice && (
          <div className={styles.loginNotice}>
            <LogIn size={18} />
            <span>Necesitás iniciar sesión para acceder a esa sección.</span>
            <Link to={`${STORE_PATH}?openLogin=true`} className={styles.loginLink}>
              Ir a la Tienda <ArrowRight size={14} />
            </Link>
          </div>
        )}
        <img src={logo || logoSrc} alt={title} className={styles.avatar} />

        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {description && (
          <p className={styles.subtitle} style={{ fontSize: '0.8rem', marginTop: '-0.75rem' }}>
            {description}
          </p>
        )}

        <div className={styles.buttons}>
          {buttons.map((btn, i) => {
            const Icon = iconMap[btn.icon];
            return isExternal(btn.url) ? (
              <a
                key={i}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
              >
                {Icon && <span className={styles.buttonIcon}><Icon size={20} /></span>}
                <span className={styles.buttonLabel}>{btn.label}</span>
                <ExternalLink size={16} style={{ opacity: 0.4, flexShrink: 0 }} />
              </a>
            ) : (
              <Link key={i} to={btn.url} className={styles.button}>
                {Icon && <span className={styles.buttonIcon}><Icon size={20} /></span>}
                <span className={styles.buttonLabel}>{btn.label}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.social}>
          {social.whatsapp && (
            <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <MessageCircle size={20} />
            </a>
          )}
          {social.instagram && (
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Instagram size={20} />
            </a>
          )}
          {social.facebook && (
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <Facebook size={20} />
            </a>
          )}
        </div>

        <p className={styles.footer}>© {new Date().getFullYear()} {title}</p>
      </div>
    </div>
  );
};

export default Linktree;
