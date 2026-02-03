import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Parcel } from '../types';

interface MapViewProps {
  parcels?: Parcel[];
  onParcelClick?: (parcel: Parcel) => void;
  selectedParcel?: Parcel | null;
}

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapView({ parcels = [], onParcelClick, selectedParcel }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 4,
    });

    map.current.on('load', () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded || parcels.length === 0) return;

    const geojson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: parcels.map(parcel => ({
        type: 'Feature',
        geometry: parcel.geometry,
        properties: {
          id: parcel.id,
          parcel_id: parcel.parcel_id,
          address: parcel.address,
          current_zoning: parcel.current_zoning,
          future_land_use: parcel.future_land_use,
          zoning_matches: parcel.current_zoning === parcel.future_land_use,
        },
      })),
    };

    if (map.current.getSource('parcels')) {
      (map.current.getSource('parcels') as mapboxgl.GeoJSONSource).setData(geojson);
    } else {
      map.current.addSource('parcels', {
        type: 'geojson',
        data: geojson,
      });

      map.current.addLayer({
        id: 'parcels-fill',
        type: 'fill',
        source: 'parcels',
        paint: {
          'fill-color': [
            'case',
            ['get', 'zoning_matches'],
            '#10b981', // green if matches
            '#ef4444', // red if doesn't match
          ],
          'fill-opacity': 0.5,
        },
      });

      map.current.addLayer({
        id: 'parcels-outline',
        type: 'line',
        source: 'parcels',
        paint: {
          'line-color': '#ffffff',
          'line-width': 2,
        },
      });

      map.current.on('click', 'parcels-fill', (e) => {
        if (!e.features || !e.features[0]) return;
        const feature = e.features[0];
        const parcelId = feature.properties?.id;
        const parcel = parcels.find(p => p.id === parcelId);
        if (parcel && onParcelClick) {
          onParcelClick(parcel);
        }
      });

      map.current.on('mouseenter', 'parcels-fill', () => {
        if (map.current) map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'parcels-fill', () => {
        if (map.current) map.current.getCanvas().style.cursor = '';
      });
    }

    // Fit bounds to show all parcels
    if (parcels.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      parcels.forEach(parcel => {
        if (parcel.geometry.type === 'Polygon') {
          parcel.geometry.coordinates[0].forEach((coord: number[]) => {
            bounds.extend(coord as [number, number]);
          });
        }
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  }, [parcels, mapLoaded, onParcelClick]);

  useEffect(() => {
    if (!map.current || !selectedParcel) return;

    // Highlight selected parcel
    if (selectedParcel.geometry.type === 'Polygon') {
      const bounds = new mapboxgl.LngLatBounds();
      selectedParcel.geometry.coordinates[0].forEach((coord: number[]) => {
        bounds.extend(coord as [number, number]);
      });
      map.current.fitBounds(bounds, { padding: 100 });
    }
  }, [selectedParcel]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}
