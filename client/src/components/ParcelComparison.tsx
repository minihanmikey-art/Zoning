import { ParcelComparisonResult } from '../types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface ParcelComparisonProps {
  comparison: ParcelComparisonResult;
}

export default function ParcelComparison({ comparison }: ParcelComparisonProps) {
  const { parcel, zoning_matches, potential_issues } = comparison;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{parcel.address}</h2>
        <p className="text-sm text-gray-600">Parcel ID: {parcel.parcel_id}</p>
        {parcel.acreage && (
          <p className="text-sm text-gray-600">Acreage: {parcel.acreage}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Current Zoning</h3>
          <p className="text-lg font-bold text-gray-900">{parcel.current_zoning}</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">Future Land Use</h3>
          <p className="text-lg font-bold text-gray-900">{parcel.future_land_use}</p>
        </div>
      </div>

      <div className={`rounded-lg p-4 flex items-start gap-3 ${
        zoning_matches ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
      }`}>
        {zoning_matches ? (
          <>
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900">Zoning Matches Future Land Use</h4>
              <p className="text-sm text-green-700 mt-1">
                No zoning changes required. Current zoning aligns with future land use plans.
              </p>
            </div>
          </>
        ) : (
          <>
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Zoning Does Not Match Future Land Use</h4>
              <p className="text-sm text-red-700 mt-1">
                Rezoning may be required to align with future land use plans.
              </p>
            </div>
          </>
        )}
      </div>

      {potential_issues && potential_issues.length > 0 && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Potential Issues</h4>
              <ul className="list-disc list-inside space-y-1">
                {potential_issues.map((issue, index) => (
                  <li key={index} className="text-sm text-amber-700">{issue}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {parcel.owner && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Owner:</span> {parcel.owner}
          </p>
        </div>
      )}
    </div>
  );
}
