import React from "react";

function MaintenanceScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">
          🚧 Maintenance Mode 🚧
        </h1>
        <p className="text-gray-700 mt-2"> We will be back soon! Stay tuned.</p>
      </div>
    </div>
  );
}

export default MaintenanceScreen;
