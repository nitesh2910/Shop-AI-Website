import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative bg-gray-900 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src="/images/hero_banner.png"
                    alt="Hero Banner"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
            </div>

            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Limited Time Offer: Get 20% Off</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
                        Elevate Your <span className="text-indigo-400">Digital</span> Lifestyle.
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                        Discover our curated collection of high-tech gear and premium fashion. Styled for the future, built for today.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-all hover:scale-105 shadow-xl shadow-indigo-500/20"
                        >
                            Shop Collection
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/shop?sale=true"
                            className="inline-flex items-center justify-center px-8 py-4 border border-gray-600 text-base font-bold rounded-full text-white hover:bg-white/10 transition-all"
                        >
                            View Sale
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats / Features */}
            <div className="relative border-t border-white/10 bg-gray-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">Free</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Shipping over $100</p>
                        </div>
                        <div className="text-center border-l border-white/10">
                            <p className="text-2xl font-bold text-white">24/7</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Expert Support</p>
                        </div>
                        <div className="text-center border-l border-white/10 hidden md:block">
                            <p className="text-2xl font-bold text-white">100%</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Original Products</p>
                        </div>
                        <div className="text-center border-l border-white/10 hidden md:block">
                            <p className="text-2xl font-bold text-white">30 Day</p>
                            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Easy Returns</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
