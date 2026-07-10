export const SITE_MODE = 'linktree'; // 'linktree' | 'ecommerce'

export const STORE_PATH = '/tienda';

export const linktreeConfig = {
  logo: null,
  title: 'Al Vuelo',
  subtitle: 'Todo en perfumería e indumentaria',

  buttons: [
    {
      label: 'Tienda Web (Perfumes)',
      url: 'https://www.alvueloperfumeria.com.ar',
      icon: 'Store',
    },
    {
      label: 'Tienda Web (Indumentaria)',
      url: 'https://www.alvuelobasix.com.ar',
      icon: 'Package',
    },
    {
      label: 'AVSTUDIO',
      url: 'https://www.avstudio.com.ar',
      icon: 'Gift',
    },
    {
      label: 'Instagram',
      url: 'https://instagram.com/Alvueloboutique',
      icon: 'Instagram',
    },
    {
      label: 'Ubicación',
      url: 'https://maps.app.goo.gl/GmGjWZ3NpoBYLEqEA',
      icon: 'MapPin',
    },
    {
      label: 'WhatsApp (Contacto/Soporte)',
      url: 'https://wa.me/5491123275263',
      icon: 'MessageCircle',
    },
  ],

  social: {
    whatsapp: 'https://wa.me/5491123275263',
    instagram: 'https://instagram.com/Alvueloboutique',
  },
};
