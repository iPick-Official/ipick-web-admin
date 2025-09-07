"use client";

import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";

const tabs = ["Profile", "Preferences", "Security"];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Settings</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "Profile" && <ProfileSettings />}
          {activeTab === "Preferences" && <PreferencesSettings />}
          {activeTab === "Security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
}

// Components for each settings tab
function ProfileSettings() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Jane Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="jane@example.com"
        />
      </div>

      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
        Save Changes
      </button>
    </form>
  );
}

function PreferencesSettings() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Language</label>
        <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Theme</label>
        <select className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2">
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>
      </div>

      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
        Save Preferences
      </button>
    </form>
  );
}

function SecuritySettings() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Current Password</label>
        <input
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
        Update Password
      </button>
    </form>
  );
}
