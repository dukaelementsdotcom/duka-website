'use client';

import React, { useState, useEffect } from 'react';
import { SpacePlannerInput, RoomConfig, WorkStyle, RoomType } from '@/components/ProjectScopePro/Shared/types';
import { useSpaceCalculator, getDefaultRoomConfiguration } from './hooks/useSpaceCalculator';
import RoomInput from './components/RoomInput';
import Results from './components/Results';
import { WORK_STYLE_DISTRIBUTION, ROOM_STANDARDS } from '@/components/ProjectScopePro/Shared/constants';

export default function SpacePlanner() {
  const { calculateSpace, reset, result } = useSpaceCalculator();
  const [isCalculating, setIsCalculating] = useState(false);

  // Form state
  const [headcount, setHeadcount] = useState(25);
  const [growthProjection, setGrowthProjection] = useState(15);
  const [workStyle, setWorkStyle] = useState<WorkStyle>(WorkStyle.HYBRID);
  const [rooms, setRooms] = useState<RoomConfig[]>(getDefaultRoomConfiguration(25, WorkStyle.HYBRID));
  const [autoDistribute, setAutoDistribute] = useState(true);

  // Auto-update rooms when headcount or workStyle changes (if auto-distribute is on)
  useEffect(() => {
    if (autoDistribute) {
      setRooms(getDefaultRoomConfiguration(headcount, workStyle));
    }
  }, [headcount, workStyle, autoDistribute]);

  const handleAddRoom = (roomType: RoomType) => {
    const newRoom: RoomConfig = {
      type: roomType,
      count: 1,
    };

    // Set default people for meeting rooms
    if (roomType === RoomType.MEETING_SMALL) {
      newRoom.peoplePerRoom = 6;
    } else if (roomType === RoomType.MEETING_MEDIUM) {
      newRoom.peoplePerRoom = 10;
    } else if (roomType === RoomType.MEETING_LARGE) {
      newRoom.peoplePerRoom = 18;
    }

    setRooms([...rooms, newRoom]);
    setAutoDistribute(false); // Turn off auto-distribute when user adds custom room
  };

  const handleUpdateRoom = (index: number, updatedRoom: RoomConfig) => {
    const newRooms = [...rooms];
    newRooms[index] = updatedRoom;
    setRooms(newRooms);
    setAutoDistribute(false);
  };

  const handleRemoveRoom = (index: number) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    const input: SpacePlannerInput = {
      headcount,
      growthProjection,
      workStyle,
      rooms,
      location: 'Addis Ababa'
    };

    calculateSpace(input);
    setIsCalculating(false);

    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('space-planner-results');
      resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    reset();
    setHeadcount(25);
    setGrowthProjection(15);
    setWorkStyle(WorkStyle.HYBRID);
    setRooms(getDefaultRoomConfiguration(25, WorkStyle.HYBRID));
    setAutoDistribute(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4">
          Office Space Planner
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Plan your office layout and get accurate area estimates based on Ethiopian workspace standards
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Headcount */}
            <div>
              <label className="block text-xs text-gray-600 mb-2 uppercase tracking-wider">
                Total Headcount
              </label>
              <input
                type="number"
                value={headcount}
                onChange={(e) => setHeadcount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="1000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Number of staff requiring workspace
              </p>
            </div>

            {/* Growth Projection */}
            <div>
              <label className="block text-xs text-gray-600 mb-2 uppercase tracking-wider">
                Growth Projection (%)
              </label>
              <input
                type="number"
                value={growthProjection}
                onChange={(e) => setGrowthProjection(Math.max(0, parseInt(e.target.value) || 0))}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Expected growth in 1-3 years
              </p>
            </div>

            {/* Work Style */}
            <div>
              <label className="block text-xs text-gray-600 mb-2 uppercase tracking-wider">
                Work Style
              </label>
              <select
                value={workStyle}
                onChange={(e) => setWorkStyle(e.target.value as WorkStyle)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value={WorkStyle.TRADITIONAL}>Traditional</option>
                <option value={WorkStyle.HYBRID}>Hybrid</option>
                <option value={WorkStyle.MODERN}>Modern/Open Plan</option>
                <option value={WorkStyle.ACTIVITY_BASED}>Activity-Based</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Layout preference for your office
              </p>
            </div>
          </div>

          {/* Auto-distribute toggle */}
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={autoDistribute}
                  onChange={(e) => {
                    setAutoDistribute(e.target.checked);
                    if (e.target.checked) {
                      setRooms(getDefaultRoomConfiguration(headcount, workStyle));
                    }
                  }}
                  className="sr-only"
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${
                  autoDistribute ? 'bg-red-600' : 'bg-gray-300'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white border border-gray-300 rounded-full transition-transform w-6 h-6 transform ${
                  autoDistribute ? 'translate-x-6' : ''
                }`}></div>
              </div>
              <div className="ml-3 text-sm font-bold text-gray-700">
                Auto-distribute rooms based on headcount
              </div>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Let our system suggest optimal room distribution
            </p>
          </div>

          {/* Room Inputs */}
          <div className="space-y-4 mb-8">
            {rooms.map((room, index) => (
              <RoomInput
                key={index}
                room={room}
                onChange={(updatedRoom) => handleUpdateRoom(index, updatedRoom)}
                onRemove={() => handleRemoveRoom(index)}
              />
            ))}
          </div>

          {/* Add Room Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => handleAddRoom(RoomType.PRIVATE_OFFICE)}
              className="text-sm font-black text-red-600 hover:text-red-700 hover:underline"
            >
              + Add Custom Room
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isCalculating}
              className={`flex-1 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg transition-all ${
                isCalculating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isCalculating ? 'Calculating...' : 'Calculate Space Requirements'}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Start Over
              </button>
            )}
          </div>
        </form>

        {/* Results Section */}
        {result && (
          <div id="space-planner-results" className="p-6 md:p-8">
            <Results result={result} />
          </div>
        )}
      </div>
    </div>
  );
}