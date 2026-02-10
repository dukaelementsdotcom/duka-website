'use client';

import React from 'react';
import { RoomCalculation } from '../../../Shared/types';
import { formatArea, formatCurrency } from '../../../Shared/utils';

interface RoomBreakdownProps {
  rooms: RoomCalculation[];
}

export default function RoomBreakdown({ rooms }: RoomBreakdownProps) {
  if (rooms.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-black uppercase tracking-wider text-gray-900">
          Room Breakdown
        </h3>
      </div>

      <div className="divide-y divide-gray-100">
        {rooms.map((room, index) => (
          <div key={index} className="px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-gray-900">
                    {getRoomDisplayName(room.type)} {room.count > 1 && `(${room.count})`}
                  </h4>
                  {room.notes && (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {room.notes}
                    </span>
                  )}
                </div>
                
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Area per unit</p>
                    <p className="font-bold">{formatArea(room.areaPerUnit)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total area</p>
                    <p className="font-bold text-red-600">{formatArea(room.totalArea)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Standard used</p>
                    <p className="text-gray-600">{room.standardUsed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getRoomDisplayName(type: RoomType): string {
  const names: Record<RoomType, string> = {
    private_office: 'Private Office',
    open_plan: 'Open Plan Area',
    meeting_small: 'Small Meeting Room',
    meeting_medium: 'Medium Meeting Room',
    meeting_large: 'Large Meeting Room',
    focus_room: 'Focus Room',
    reception: 'Reception',
    breakout: 'Breakout Space',
    archive: 'Archive Room',
    storage: 'Storage Room',
    canteen: 'Canteen',
    pantry: 'Pantry',
    print_room: 'Print Room',
    server_room: 'Server Room',
    wellness: 'Wellness Room',
    circulation: 'Circulation'
  };
  return names[type];
}