import { Link } from 'react-router-dom';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ShoppingBag,
    CreditCard
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center group">
                            <ShoppingBag className="h-8 w-8 text-indigo-500" />
                            <span className="ml-2 font-bold text-2xl tracking-tight text-white">
                                Shop<span className="text-indigo-500">AI</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Redefining the digital shopping experience with AI-powered curation and premium quality products. Style for the future, delivered today.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Explore</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
                            <li><Link to="/shop" className="hover:text-indigo-400 transition-colors">Shop All</Link></li>
                            <li><Link to="/cart" className="hover:text-indigo-400 transition-colors">Your Cart</Link></li>
                            <li><Link to="/login" className="hover:text-indigo-400 transition-colors">Sign In</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Customer Support</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li className="flex items-center space-x-3">
                                <Phone size={16} className="text-indigo-500" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={16} className="text-indigo-500" />
                                <span>support@shopai.com</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin size={16} className="text-indigo-500 mt-1" />
                                <span>123 Innovation Drive, Tech Valley, CA 94043</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-white font-bold text-lg">Join the Tech Drop</h3>
                        <p className="text-sm text-slate-400">Subscribe for early access to new releases and exclusive member-only offers.</p>
                        <form className="flex flex-col space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-slate-800 border-transparent rounded-lg py-3 px-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">
                                Subscribe Now
                            </button>
                        </form>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-xs font-medium text-slate-500">
                            © 2026 ShopAI E-commerce. All rights reserved. Built with precision.
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center space-x-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-500 cursor-default">
                            <CreditCard size={24} />
                            <span className="text-xs font-bold tracking-tighter uppercase">Visa</span>
                            <span className="text-xs font-bold tracking-tighter uppercase">Mastercard</span>
                            <span className="text-xs font-bold tracking-tighter uppercase">PayPal</span>
                            <span className="text-xs font-bold tracking-tighter uppercase">Apple Pay</span>
                        </div>

                        {/* Secondary Links */}
                        <div className="flex space-x-8 text-xs font-medium text-slate-500">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                            <a href="#" className="hover:text-white transition-colors">Shipping Info</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
