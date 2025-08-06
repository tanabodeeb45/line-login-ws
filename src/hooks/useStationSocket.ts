import { useEffect } from 'react';
import socket from '../socket';

export interface StationData {
  stationId: number;
  nameTH: string;
  nameEN: string;
  district: string;
  latitude: number;
  longitude: number;
  waterLevelCM: number;
  waterLevelPercent: number;
  lastSync: string | null;
}

export function useStationSocket(
  setStations: React.Dispatch<React.SetStateAction<Record<number, StationData>>>,
) {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    socket.auth = { token: accessToken };
    socket.connect();

    const handleStationEvent = (data: StationData) => {
      console.log('Received station:event', data);
      setStations((prev) => ({
        ...prev,
        [data.stationId]: data,
      }));
    };

    const handleInitialStations = (list: StationData[]) => {
      console.log('Received stations:info', list);
      const map: Record<number, StationData> = {};
      for (const s of list) {
        map[s.stationId] = s;
      }
      setStations(map);
    };

    socket.on('station:event', handleStationEvent);
    socket.on('stations:info', handleInitialStations);

    return () => {
      socket.off('station:event', handleStationEvent);
      socket.off('stations:info', handleInitialStations);
    };
  }, [setStations]);
}
