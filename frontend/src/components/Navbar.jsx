import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { ShoppingCart, User, LogOut, Menu, X, Search, ChevronDown, LayoutDashboard, ShoppingBag } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/shop?search=${keyword}`);
        } else {
            navigate('/shop');
        }
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Main Nav */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center group">
                            <ShoppingBag className="h-8 w-8 text-indigo-600 group-hover:scale-110 transition-transform" />
                            <span className="ml-2 font-bold text-2xl tracking-tight text-gray-900">
                                Shop<span className="text-indigo-600">AI</span>
                            </span>
                        </Link>

                        <div className="hidden lg:ml-10 lg:flex lg:space-x-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/shop"
                                className={({ isActive }) =>
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${isActive ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                                }
                            >
                                Shop
                            </NavLink>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 items-center justify-center px-8 lg:ml-6 lg:justify-end">
                        <form onSubmit={submitHandler} className="max-w-lg w-full lg:max-w-xs relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                className="block w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-transparent sm:text-sm transition-all"
                                placeholder="Search products..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-6">
                        <Link to="/cart" className="text-gray-500 hover:text-gray-900 relative p-2 rounded-full hover:bg-gray-50 transition-colors group">
                            <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-sm animate-shrink">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative flex items-center">
                                {/* Admin Menu */}
                                {user.isAdmin && (
                                    <div className="mr-6 relative">
                                        <button
                                            onMouseEnter={() => setIsAdminDropdownOpen(true)}
                                            onMouseLeave={() => setIsAdminDropdownOpen(false)}
                                            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            <LayoutDashboard className="h-5 w-5 mr-1" />
                                            <span>Admin</span>
                                            <ChevronDown className="h-4 w-4 ml-1" />
                                        </button>

                                        {isAdminDropdownOpen && (
                                            <div
                                                onMouseEnter={() => setIsAdminDropdownOpen(true)}
                                                onMouseLeave={() => setIsAdminDropdownOpen(false)}
                                                className="absolute right-0 mt-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in duration-75"
                                            >
                                                <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Products</Link>
                                                <Link to="/admin/orderlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</Link>
                                                <Link to="/admin/userlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Users</Link>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onMouseEnter={() => setIsUserDropdownOpen(true)}
                                        onMouseLeave={() => setIsUserDropdownOpen(false)}
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 mr-2">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <span className="max-w-[100px] truncate">{user.name}</span>
                                        <ChevronDown className="h-4 w-4 ml-1" />
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div
                                            onMouseEnter={() => setIsUserDropdownOpen(true)}
                                            onMouseLeave={() => setIsUserDropdownOpen(false)}
                                            className="absolute right-0 mt-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in duration-75"
                                        >
                                            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                                            <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</Link>
                                            <hr className="my-1 border-gray-100" />
                                            <button
                                                onClick={logout}
                                                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden space-x-4">
                        <Link to="/cart" className="text-gray-500 relative p-2">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-900 p-2 rounded-md focus:outline-none hover:bg-gray-100"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden animate-in slide-in-from-top duration-200">
                    <div className="pt-2 pb-3 space-y-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/shop"
                            className={({ isActive }) =>
                                `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'}`
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </NavLink>
                    </div>

                    {/* Mobile Search */}
                    <div className="px-4 pb-4">
                        <form onSubmit={submitHandler} className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full bg-gray-50 border-gray-200 border rounded-lg py-2 pl-9 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Search..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                        </form>
                    </div>

                    <div className="pt-4 pb-3 border-t border-gray-200">
                        {user ? (
                            <div className="space-y-1">
                                <div className="px-4 py-2 flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                                            <User className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    to="/orders"
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    My Orders
                                </Link>
                                {user.isAdmin && (
                                    <>
                                        <hr className="my-2 border-gray-100" />
                                        <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-widest">Admin</p>
                                        <Link to="/admin/productlist" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Admin Products</Link>
                                        <Link to="/admin/orderlist" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Admin Orders</Link>
                                        <Link to="/admin/userlist" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Admin Users</Link>
                                    </>
                                )}
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full text-left block px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <div className="px-4 py-2">
                                <Link
                                    to="/login"
                                    className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
