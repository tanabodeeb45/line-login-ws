import React, { useState } from 'react';
import { useStationSocket, StationData } from '../hooks/useStationSocket';
import { StationCard } from '../components/StationCard';

const DashboardPage = () => {
  const [stations, setStations] = useState<Record<number, StationData>>({});
  useStationSocket(setStations);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">สถานีทั้งหมด (Real-time)</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(stations).map(([id, data]) => (
          <StationCard key={id} id={+id} data={data} />
        ))}
      </ul>
    </div>
  );
};
export default DashboardPage;