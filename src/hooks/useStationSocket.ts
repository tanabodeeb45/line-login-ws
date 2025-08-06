import { useEffect } from 'react';
import socket from '../socket';

export interface StationData {
  id: number;
  nameTH: string;
  nameEN: string;
  district: string;
  latitude: number;
  longitude: number;
  waterLevelCM: number;
  waterLevelPercent: number;
  lastSync: string | null;
  tankDepth: number;
  noOfPumps: number;
  status: string;
  cabinetDoorOpen: boolean;
  phone: string;
  pumps: {
    id: number;
    status: string;
    power: number;
    operatingHrs: number;
  }[];
  cctvImages: string[];
}

export function useStationSocket(
  setStations: React.Dispatch<React.SetStateAction<Record<number, StationData>>>
) {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      socket.auth = { token: accessToken };
    }

    socket.connect();

    const handleConnect = () => {
      console.log('socket connected');
      socket.emit('stations:subscribe');
    };

    const handleStationEvent = (data: StationData) => {
      console.log('station:event', data);
      setStations((prev) => ({
        ...prev,
        [data.id]: data,
      }));
    };

    const handleInitialStations = (list: StationData[]) => {
      console.log('stations:info', list);
      const map: Record<number, StationData> = {};
      for (const s of list) {
        map[s.id] = s;
      }
      setStations(map);
    };

    socket.on('connect', handleConnect);
    socket.on('station:event', handleStationEvent);
    socket.on('stations:info', handleInitialStations);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('station:event', handleStationEvent);
      socket.off('stations:info', handleInitialStations);
    };
  }, [setStations]);

  return null;
}
