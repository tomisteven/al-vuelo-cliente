import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './components/Toast/Toast';
import CurrencyBanner from './components/CurrencyBanner/CurrencyBanner';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import WhatsAppFloat from './components/WhatsAppFloat/WhatsAppFloat';
import DiscountPopup from './components/DiscountPopup/DiscountPopup';

// Pages
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Combos from './pages/Combos/Combos';
import Checkout from './pages/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import AdminLayout from './pages/Admin/AdminLayout';
import Nicho from './pages/Nicho/Nicho';
import Miniaturas from './pages/Miniaturas/Miniaturas';
import FAQ from './pages/FAQ/FAQ';
import About from './pages/About/About';
import ProductForm from './pages/Admin/ProductForm';
import ComboForm from './pages/Admin/ComboForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Linktree from './pages/Linktree/Linktree';

// Admin Tab Components
import ProductsTab from './pages/Admin/components/ProductsTab';
import CombosTab from './pages/Admin/components/CombosTab';
import UsersTab from './pages/Admin/components/UsersTab';
import OrdersTab from './pages/Admin/components/OrdersTab';
import EmailsTab from './pages/Admin/components/EmailsTab';
import DiscountsTab from './pages/Admin/components/DiscountsTab';
import SettingsTab from './pages/Admin/components/SettingsTab';

import { SITE_MODE, STORE_PATH } from './config/siteMode';

function StoreRoutes({ storePrefix }) {
    const p = (path) => `${storePrefix}${path}`;

    return (
        <Routes>
            <Route path={storePrefix || '/'} element={<Home />} />
            <Route path={p('/productos')} element={<Products />} />
            <Route path={p('/combos')} element={<Combos />} />
            <Route path={p('/checkout')} element={<Checkout />} />
            <Route path={p('/perfil')} element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path={p('/nicho')} element={<Nicho />} />
            <Route path={p('/miniaturas')} element={<Miniaturas />} />
            <Route path={p('/faq')} element={<FAQ />} />
            <Route path={p('/nosotros')} element={<About />} />

            <Route path={p('/admin')} element={
                <ProtectedRoute adminOnly>
                    <AdminLayout />
                </ProtectedRoute>
            }>
                <Route index element={<Navigate to={p('/admin/productos')} replace />} />
                <Route path="productos" element={<ProductsTab />} />
                <Route path="combos" element={<CombosTab />} />
                <Route path="usuarios" element={<UsersTab />} />
                <Route path="pedidos" element={<OrdersTab />} />
                <Route path="emails" element={<EmailsTab />} />
                <Route path="cupones" element={<DiscountsTab />} />
                <Route path="configuracion" element={<SettingsTab />} />
            </Route>

            <Route path={p('/admin/crear-producto')} element={
                <ProtectedRoute adminOnly>
                    <ProductForm />
                </ProtectedRoute>
            } />
            <Route path={p('/admin/editar-producto/:id')} element={
                <ProtectedRoute adminOnly>
                    <ProductForm />
                </ProtectedRoute>
            } />
            <Route path={p('/admin/crear-combo')} element={
                <ProtectedRoute adminOnly>
                    <ComboForm />
                </ProtectedRoute>
            } />
            <Route path={p('/admin/editar-combo/:id')} element={
                <ProtectedRoute adminOnly>
                    <ComboForm />
                </ProtectedRoute>
            } />

            <Route path="*" element={
                SITE_MODE === 'linktree' ? (
                    <Navigate to="/" />
                ) : (
                    <div style={{ padding: '200px 0', textAlign: 'center' }}>
                        <h1>404</h1>
                        <p>Página no encontrada</p>
                    </div>
                )
            } />
        </Routes>
    );
}

function StoreLayout() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const prefix = SITE_MODE === 'linktree' ? STORE_PATH : '';

    return (
        <div className="app">
            <CurrencyBanner />
            <Header toggleCart={() => setIsCartOpen(true)} storePrefix={prefix} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            <main style={{ minHeight: '80vh' }}>
                <StoreRoutes storePrefix={prefix} />
            </main>

            <Footer />
            <WhatsAppFloat />
            <DiscountPopup />
        </div>
    );
}

function AppProviders({ children }) {
    return (
        <AuthProvider>
            <CurrencyProvider>
                <ThemeProvider>
                    <CartProvider>
                        <ToastProvider>
                            <NotificationProvider>
                                {children}
                            </NotificationProvider>
                        </ToastProvider>
                    </CartProvider>
                </ThemeProvider>
            </CurrencyProvider>
        </AuthProvider>
    );
}

function App() {
    return (
        <AppProviders>
            <Router>
                {SITE_MODE === 'linktree' ? (
                    <Routes>
                        <Route path="/" element={<Linktree />} />
                        <Route path={`${STORE_PATH}/*`} element={<StoreLayout />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                ) : (
                    <StoreLayout />
                )}
            </Router>
        </AppProviders>
    );
}

export default App;
