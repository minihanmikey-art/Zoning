import { useState } from 'react';
import MapView from './components/MapView';
import ParcelComparison from './components/ParcelComparison';
import SearchBar from './components/SearchBar';
import { parcelApi } from './api/client';
import { Parcel, ParcelComparisonResult } from './types';
import { MapPin } from 'lucide-react';

function App() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [comparison, setComparison] = useState<ParcelComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await parcelApi.search(query);
      setParcels(response.data);
      if (response.data.length === 0) {
        setError('No parcels found matching your search');
      }
    } catch (err) {
      setError('Failed to search parcels. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleParcelClick = async (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setLoading(true);
    try {
      const response = await parcelApi.compare(parcel.id);
      setComparison(response.data);
    } catch (err) {
      setError('Failed to load parcel comparison');
      console.error('Comparison error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Zoning Land Use Planner</h1>
          </div>
          <div className="max-w-2xl">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <MapView
            parcels={parcels}
            selectedParcel={selectedParcel}
            onParcelClick={handleParcelClick}
          />
          {loading && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg">
              Loading...
            </div>
          )}
          {error && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-lg">
              {error}
            </div>
          )}
        </div>

        {comparison && (
          <div className="w-full md:w-96 lg:w-[500px] bg-gray-50 overflow-y-auto p-4 border-l">
            <ParcelComparison comparison={comparison} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
