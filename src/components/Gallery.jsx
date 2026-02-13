import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid, LayoutTemplate } from 'lucide-react';

// Using local images that we know are working
const images = [
    "/assets/services/wedding.jpg",
    "/assets/services/engagement.jpg",
    "/assets/services/pre_wedding.jpg",
    "/assets/services/haldi.jpg",
    "/assets/services/wedding.jpg", // Repeat for demo
    "/assets/services/engagement.jpg"
];

// Placeholder data for albums - using local images
const albums = {
    "Wedding": [
        "/assets/services/wedding.jpg",
        "/assets/services/pre_wedding.jpg",
        "/assets/services/haldi.jpg",
        "/assets/services/engagement.jpg"
    ],
    "Engagement": [
        "/assets/services/engagement.jpg",
        "/assets/services/wedding.jpg"
    ],
    "Pre Wedding": [
        "/assets/services/pre_wedding.jpg",
        "/assets/services/haldi.jpg"
    ],
    "Haldi Ceremony": [
        "/assets/services/haldi.jpg",
        "/assets/services/wedding.jpg"
    ]
};

const Gallery = () => {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'

    const openAlbum = (category) => {
        setSelectedAlbum(category);
        document.body.style.overflow = 'hidden';
    };

    const closeAlbum = () => {
        setSelectedAlbum(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Portfolio</h2>
                <p className="text-gray-600 font-light">Capturing moments that last forever.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="group relative overflow-hidden cursor-pointer"
                        onClick={() => openAlbum(["Wedding", "Engagement", "Pre Wedding", "Haldi Ceremony"][idx % 4])}
                    >
                        <img
                            src={img}
                            alt={`Portfolio ${idx}`}
                            className="w-full h-[400px] object-cover transition duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                            <p className="text-white font-serif text-xl tracking-wider">View Album</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-16">
                <button className="border border-[#1C1C1C] px-10 py-3 hover:bg-[#1C1C1C] hover:text-white transition duration-300 font-sans tracking-widest text-sm uppercase">
                    View More
                </button>
            </div>

            {/* Album Modal */}
            <AnimatePresence>
                {selectedAlbum && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-y-auto"
                    >
                        <div className="min-h-screen px-6 py-12">
                            {/* Header */}
                            <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md z-50">
                                <h3 className="text-white font-serif text-2xl">{selectedAlbum}</h3>

                                <div className="flex items-center gap-6">
                                    {/* View Toggle */}
                                    <div className="flex bg-white/10 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
                                            title="Regular Grid"
                                        >
                                            <Grid size={20} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('masonry')}
                                            className={`p-2 rounded-md transition ${viewMode === 'masonry' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`}
                                            title="Native Aspect Ratio"
                                        >
                                            <LayoutTemplate size={20} />
                                        </button>
                                    </div>

                                    <button onClick={closeAlbum} className="text-white hover:opacity-70 transition">
                                        <X size={32} />
                                    </button>
                                </div>
                            </div>

                            {/* Images Grid */}
                            <div className={`mt-24 max-w-7xl mx-auto ${viewMode === 'grid'
                                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                                : 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6'
                                }`}>
                                {albums[selectedAlbum]?.map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="break-inside-avoid"
                                    >
                                        <img
                                            src={img}
                                            alt={`${selectedAlbum} ${idx}`}
                                            className={`w-full rounded-lg ${viewMode === 'grid' ? 'h-[300px] object-cover' : 'h-auto'
                                                }`}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
export default Gallery;
