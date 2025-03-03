'use client';
//dashboard page

import { useEffect } from 'react';
import useStore from './store/store';

export default function Dashboard() {
    const { 
        prices, 
        isLoading, 
        error, 
        fetchPrices, 
        searchQuery, 
        setSearchQuery,
        isDarkMode,
        toggleTheme 
    } = useStore();

    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 30000);
        return () => clearInterval(interval);
    }, [fetchPrices]);

    const filteredPrices = prices.filter(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-white'} p-8 transition-colors duration-200`}>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 text-center relative">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className={`absolute right-0 top-0 p-2 rounded-lg 
                                  ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}
                                  transition-colors duration-200`}
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? (
                            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                        Crypto<span className="text-blue-500">Track</span>
                    </h1>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Real-time cryptocurrency price tracking
                    </p>
                </div>

                {/* Search and Refresh Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search cryptocurrencies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full md:w-80 px-5 py-3 rounded-xl 
                                    border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    ${isDarkMode 
                                        ? 'bg-gray-800 text-white border-gray-700 placeholder-gray-500' 
                                        : 'bg-white text-gray-900 border-gray-200 placeholder-gray-400'}`}
                        />
                        <svg
                            className={`absolute right-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <button
                        onClick={() => fetchPrices()}
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
                                 transition-all duration-200 transform hover:scale-105 
                                 flex items-center justify-center gap-2 shadow-lg"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Refresh
                    </button>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="relative w-20 h-20">
                            <div className={`absolute top-0 left-0 w-full h-full border-4 ${isDarkMode ? 'border-blue-500/30' : 'border-blue-300/30'} rounded-full`}></div>
                            <div className={`absolute top-0 left-0 w-full h-full border-4 ${isDarkMode ? 'border-blue-500' : 'border-blue-500'} rounded-full border-t-transparent animate-spin`}></div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={`${isDarkMode ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-red-50 border-red-200 text-red-600'} 
                                   border px-6 py-4 rounded-xl mb-8`} 
                         role="alert">
                        <div className="flex items-center gap-3">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <strong className="font-medium">Error: </strong>
                                <span>{error}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Crypto Cards Grid */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrices.map((crypto) => (
                            <div key={crypto.id} 
                                 className={`${isDarkMode 
                                    ? 'bg-gray-800/50 backdrop-blur-lg border-gray-700/50 hover:shadow-blue-500/10' 
                                    : 'bg-white border-gray-100 hover:shadow-blue-100'} 
                                    rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 
                                    transform hover:-translate-y-1 border`}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                        {crypto.name}
                                    </h2>
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full
                                                    ${isDarkMode 
                                                        ? 'bg-gray-700 text-blue-400' 
                                                        : 'bg-blue-50 text-blue-600'}`}>
                                        {crypto.symbol}
                                    </span>
                                </div>
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold text-blue-500">$</span>
                                    <span className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} ml-1`}>
                                        {crypto.usd.toLocaleString()}
                                    </span>
                                    <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>USD</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* No Results State */}
                {!isLoading && !error && filteredPrices.length === 0 && (
                    <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-12`}>
                        <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xl">No cryptocurrencies found matching your search.</p>
                    </div>
                )}

                {/* Auto-refresh Indicator */}
                <div className={`mt-12 text-center ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm`}>
                    Prices auto-refresh every 30 seconds
                </div>
            </div>
        </div>
    );
}
