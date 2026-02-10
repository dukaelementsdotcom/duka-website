'use client';

import React, { useState } from 'react';
import { RoomType, RoomConfig, WorkStyle } from '../../../Shared/types';
import { ROOM_STANDARDS } from '../../../Shared/constants';

interface RoomInputProps {
  room: RoomConfig;
  onChange: (room: RoomConfig) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export default function RoomInput({ room, onChange, onRemove, disabled }: RoomInputProps) {
  const [expanded, setExpanded] = useState(false);

  const roomName = getRoomDisplayName(room.type);
  const standard = ROOM_STANDARDS[room.type];

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(0, parseInt(e.target.value) || 0);
    onChange({ ...room, count });
  };

  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseFloat(e.target.value);
    onChange({ 
      ...room, 
      customSize: isNaN(size) ? undefined : size,
      notes: `Custom size: ${size}m²`
    });
  };

  const handlePeoplePerRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const people = Math.max(1, parseInt(e.target.value) || 1);
    onChange({ ...room, peoplePerRoom: people });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-900">{roomName}</h4>
            {room.notes && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                {room.notes}
              </span>
            )}
          </div>
          
          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">
                  Number of {room.type === RoomType.OPEN_PLAN ? 'people' : 'rooms'}
                </label>
                <input
                  type="number"
                  value={room.count}
                  onChange={handleCountChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={disabled}
                />
              </div>

              {room.type === RoomType.MEETING_SMALL || 
               room.type === RoomType.MEETING_MEDIUM || 
               room.type === RoomType.MEETING_LARGE ? (
                <div className="flex-1">
                  <label className="block text-xs text-gray-600 mb-1">
                    People per room
                  </label>
                  <input
                    type="number"
                    value={room.peoplePerRoom || 6}
                    onChange={handlePeoplePerRoomChange}
                    min="1"
                    max="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    disabled={disabled}
                  />
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-red-600 hover:text-red-700 font-bold"
              >
                {expanded ? 'Hide Details' : 'Show Details'}
              </button>
            </div>

            {expanded && (
              <div className="pt-3 border-t border-gray-200">
                <label className="block text-xs text-gray-600 mb-1">
                  Custom Size (m²) - Leave blank for auto-calculation
                </label>
                <input
                  type="number"
                  value={room.customSize || ''}
                  onChange={handleCustomSizeChange}
                  min="0"
                  step="0.1"
                  placeholder="Auto-calculated"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={disabled}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Standard: {getStandardDescription(room.type, room)}
                </p>
              </div>
            )}
          </div>
        </div>

        {!disabled && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
            title="Remove room"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function getRoomDisplayName(type: RoomType): string {
  const names: Record<RoomType, string> = {
    private_office: 'Private Office',
    open_plan: 'Open Plan Workstations',
    meeting_small: 'Small Meeting Room (4-6ppl)',
    meeting_medium: 'Medium Meeting Room (8-12ppl)',
    meeting_large: 'Large Meeting Room (15-20ppl)',
    focus_room: 'Focus Room',
    reception: 'Reception Area',
    breakout: 'Breakout/Collaboration Space',
    archive: 'Archive Room',
    storage: 'Storage Room',
    canteen: 'Canteen/Dining Area',
    pantry: 'Pantry/Tea Point',
    print_room: 'Print Room',
    server_room: 'Server Room',
    wellness: 'Wellness/Mother\'s Room',
    circulation: 'Circulation Space'
  };
  return names[type];
}

function getStandardDescription(type: RoomType, room: RoomConfig): string {
  const standard = ROOM_STANDARDS[type];
  
  switch (type) {
    case RoomType.PRIVATE_OFFICE:
      return `${standard.standard.min}-${standard.standard.max}m² per office`;
    case RoomType.OPEN_PLAN:
      return `${standard.perPerson.min}-${standard.perPerson.max}m² per person`;
    case RoomType.MEETING_SMALL:
    case RoomType.MEETING_MEDIUM:
    case RoomType.MEETING_LARGE:
      return `${standard.perPerson}m² per person + table clearance`;
    case RoomType.CANTEEN:
      return `${standard.perSeat}m² per seat + ${standard.kitchenArea}m² kitchen`;
    default:
      return 'Standard calculation applies';
  }
}