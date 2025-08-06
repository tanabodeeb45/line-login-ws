import React from 'react';
import { StationData } from '../hooks/useStationSocket';

interface Props {
  id: number;
  data: StationData;
}

export const StationCard: React.FC<Props> = ({ id, data }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{data.nameTH} ({data.nameEN})</h2>
      <p className="text-sm text-gray-500">เขต: {data.district}</p>
      <p>ระดับน้ำ: {data.waterLevelCM} cm ({data.waterLevelPercent}%)</p>
      <p>พิกัด: {data.latitude}, {data.longitude}</p>
      <p>อัปเดตล่าสุด: {data.lastSync || 'ไม่มีข้อมูล'}</p>
    </div>
  );
};
