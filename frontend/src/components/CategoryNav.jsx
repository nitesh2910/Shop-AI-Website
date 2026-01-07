import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../api';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CategoryNav = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/categories/');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-8 h-12 whitespace-nowrap">
                    <NavLink
                        to="/shop"
                        className={({ isActive }) =>
                            `text-sm font-medium transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`
                        }
                    >
                        All Categories
                    </NavLink>
                    {categories.map((category) => (
                        <NavLink
                            key={category._id || category.id}
                            to={`/shop?category=${category.name}`}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-indigo-600 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`
                            }
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryNav;
