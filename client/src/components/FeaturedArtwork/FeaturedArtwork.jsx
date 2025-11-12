import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import axios from 'axios';
import { Heart, Eye, User, Palette } from 'lucide-react';
import './FeaturedArtwork.css';

const FeaturedArtworks = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedArtworks();
  }, []);

  const fetchFeaturedArtworks = () => {
    axios.get('http://localhost:3000/artworks/latest')
      .then(response => {
        setFeaturedArtworks(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        toast.error("Failed to load artworks!");
      });
  };

  return (
    <section className="featured-artworks-section py-20 px-4 overflow-hidden">
       
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl top-0 -left-20 bg-animated"></div>
        <div className="absolute w-80 h-80 bg-accent opacity-10 rounded-full blur-3xl bottom-0 -right-20 bg-animated-reverse"></div>
        <div className="absolute w-64 h-64 bg-secondary opacity-10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-animated"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-base-content mb-4 tracking-tight">
            Featured Artworks
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary mx-auto rounded-full"></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-transparent"></div>
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-accent border-t-transparent absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
          </div>
        ) : featuredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-base-content opacity-50 text-xl">No artworks available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtworks.map((artwork) => (
                <div key={artwork._id} className="artwork-card group">
                  <div className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] shadow-xl hover:shadow-2xl">
                    
                    <figure className="relative h-80 overflow-hidden">
                      <img
                        src={artwork.image_url}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                      
                      <div className="absolute top-4 right-4 glass-overlay px-3 py-2 rounded-full flex items-center gap-2">
                        <Palette className="w-4 h-4 text-accent" />
                        <span className="text-xs font-semibold text-white">{artwork.category}</span>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 line-clamp-2 drop-shadow-lg">{artwork.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <User className="w-4 h-4 opacity-80" />
                          <p className="text-sm opacity-90 font-medium">By {artwork.artist_name}</p>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="glass-overlay px-4 py-2 rounded-full flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-current text-error" />
                            <span className="text-sm font-bold">{artwork.likes || 0}</span>
                          </div>
                          
                          <Link to={`/artwork/${artwork._id}`}>
                            <button className="artwork-button">
                              <Eye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </figure>
                    
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/explore">
                <button className="view-all-button">
                  <span>View All</span>
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedArtworks;