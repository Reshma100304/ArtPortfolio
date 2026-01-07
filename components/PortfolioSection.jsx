import React, { useState } from 'react';
import { Palette, Brush, PenTool, ChevronRight, X, ChevronLeft } from 'lucide-react';
import { portfolioItems, categories } from '../data/portfolioData'; // Importing data

const PortfolioSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewingCollection, setViewingCollection] = useState(null);

    const filteredItems = activeCategory === "All"
        ? portfolioItems
        : portfolioItems.filter(item => item.category === activeCategory);

    let relatedWorks = selectedItem
        ? portfolioItems.filter(item =>
            item.id !== selectedItem.id &&
            (item.category === selectedItem.category || item.subType === selectedItem.subType)
        )
        : [];

    if (selectedItem && relatedWorks.length === 0) {
        relatedWorks = portfolioItems.filter(item => item.id !== selectedItem.id).sort(() => 0.5 - Math.random());
    }

    relatedWorks = relatedWorks.slice(0, 3);

    return (
        <section id="portfolio" className="py-20 bg-stone-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-stone-900">Curated Collections</h2>
                    <p className="text-stone-500 mt-2">Explore artworks by category</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${activeCategory === cat
                                ? 'bg-stone-800 text-white shadow-md'
                                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-300 cursor-pointer flex flex-col h-full"
                        >
                            <div className={`h-80 w-full ${item.image ? 'bg-stone-50' : item.color} flex items-center justify-center relative overflow-hidden`}>
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="opacity-20 transform group-hover:scale-110 transition duration-700">
                                        {item.category === 'Traditional' ? <Palette size={64} /> :
                                            item.category === 'Modern' ? <Brush size={64} /> : <PenTool size={64} />}
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div>
                                    <span className="inline-block bg-amber-50 text-amber-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-amber-100">
                                        {item.subType}
                                    </span>
                                    <h3 className="font-bold text-lg text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                                    <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setViewingCollection(item.subType);
                                    }}
                                    className="w-full mt-auto py-2 border border-stone-200 rounded-lg text-stone-600 font-medium text-sm hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    Enquire Now <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sub-page Collection View Overlay */}
            {viewingCollection && (
                <div className="fixed inset-0 z-50 bg-stone-50 overflow-y-auto animate-in slide-in-from-right duration-500">
                    <div className="max-w-7xl mx-auto px-4 py-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                            <button
                                onClick={() => setViewingCollection(null)}
                                className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors group"
                            >
                                <div className="p-2 rounded-full bg-white shadow-sm border border-stone-200 group-hover:bg-stone-100 transition-all">
                                    <ChevronLeft size={20} />
                                </div>
                                <span className="font-medium">Back to Portfolio</span>
                            </button>

                            <div className="text-center md:text-right">
                                <span className="inline-block bg-amber-50 text-amber-700 px-4 py-1 text-xs font-black uppercase tracking-widest rounded-full mb-3 border border-amber-100">
                                    Collection
                                </span>
                                <h1 className="text-4xl md:text-5xl font-serif text-stone-900 capitalize">{viewingCollection}</h1>
                            </div>
                        </div>

                        {/* Filtered Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {portfolioItems.filter(item => item.subType === viewingCollection).map((item) => (
                                <div
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedItem(item);
                                    }}
                                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-stone-200 flex flex-col cursor-pointer translate-y-0 hover:-translate-y-2"
                                >
                                    <div className={`h-72 w-full ${item.image ? 'bg-stone-50' : item.color} flex items-center justify-center relative overflow-hidden`}>
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="opacity-10 transform group-hover:scale-110 transition duration-700">
                                                <Palette size={80} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                    </div>

                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="font-bold text-xl text-stone-800 mb-3 group-hover:text-amber-700 transition-colors">{item.title}</h3>
                                        <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-grow italic">
                                            "{item.description}"
                                        </p>
                                        <button className="w-full py-3 bg-stone-50 text-stone-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all duration-300 border border-stone-200 hover:border-stone-900 border-dashed">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="mt-20 text-center border-t border-stone-200 pt-12 max-w-2xl mx-auto">
                            <h3 className="text-xl font-serif text-stone-800 mb-4 italic">Interested in a custom {viewingCollection} piece?</h3>
                            <p className="text-stone-500 text-sm leading-relaxed mb-8">
                                Every piece in the {viewingCollection} collection is handcrafted with care. If you have a specific design or vision in mind, I'd love to collaborate on a bespoke creation for you.
                            </p>
                            <button className="bg-stone-900 text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all shadow-xl hover:shadow-amber-700/20">
                                Start a Conversation
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Related Works Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative overflow-hidden">
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-600 hover:text-stone-900 z-10 shadow-sm border border-stone-100 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Main Item Image & Details */}
                            <div className="md:w-1/2 h-80 md:h-auto min-h-[300px] relative">
                                <div className={`absolute inset-0 ${selectedItem.image ? 'bg-stone-50' : selectedItem.color} flex items-center justify-center`}>
                                    {selectedItem.image ? (
                                        <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="opacity-20">
                                            {selectedItem.category === 'Traditional' ? <Palette size={100} /> :
                                                selectedItem.category === 'Modern' ? <Brush size={100} /> : <PenTool size={100} />}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="md:w-1/2 p-8">
                                <div className="mb-6">
                                    <span className="inline-block bg-amber-50 text-amber-700 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 border border-amber-100">
                                        {selectedItem.subType}
                                    </span>
                                    <h2 className="text-3xl font-serif text-stone-900 mb-4">{selectedItem.title}</h2>
                                    <p className="text-stone-600 leading-relaxed mb-6">
                                        {selectedItem.description}
                                    </p>
                                    <a
                                        href="https://ig.me/m/artistry_reshuu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-stone-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition-all shadow-lg shadow-stone-900/10"
                                    >
                                        Inquire on Instagram
                                    </a>
                                </div>

                                {/* Related Items Section */}
                                {relatedWorks.length > 0 && (
                                    <div className="border-t border-stone-100 pt-6">
                                        <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">
                                            {relatedWorks.some(item => item.category === selectedItem.category) ? "You may also like" : "Explore More"}
                                        </h4>
                                        <div className="grid grid-cols-3 gap-3">
                                            {relatedWorks.map(related => (
                                                <div
                                                    key={related.id}
                                                    onClick={() => setSelectedItem(related)}
                                                    className="cursor-pointer group"
                                                >
                                                    <div className={`aspect-square rounded-lg overflow-hidden border border-stone-200 bg-stone-50 mb-1`}>
                                                        {related.image ? (
                                                            <img src={related.image} alt={related.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-110" />
                                                        ) : (
                                                            <div className={`w-full h-full ${related.color} flex items-center justify-center opacity-40`}>
                                                                <Palette size={20} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] font-bold text-stone-600 truncate group-hover:text-amber-700">{related.title}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section >
    );
};

export default PortfolioSection;
