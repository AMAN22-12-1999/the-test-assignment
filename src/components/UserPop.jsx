import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const navigate = useNavigate();
  const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

  // Filter users based on UserName input
  const filteredUsers = storedUsers.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={() => setShowPopup(true)}
        className="bg-green-500 text-white p-3 rounded-lg"
      >
        Show User Details
      </button>

      {showPopup && storedUsers.length > 0 && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center">User Details</h2>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by Username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 mb-3 border rounded-lg"
            />

            {/* User List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.userId} className="border-b py-2">
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Department:</strong> {user.department}</p>
                    <p><strong>Seniority Level:</strong> {user.seniority}</p>
                    <p><strong>Date of Birth:</strong> {user.dob}</p>
                    <p><strong>Employee Code:</strong> {user.empCode}</p>
                    <p><strong>Username:</strong> {user.userName}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-700 text-center">No matching users found.</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSearchQuery("")}
                className="bg-blue-500 text-white p-2 rounded w-1/3"
              >
                Reset
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-red-500 text-white p-2 rounded w-1/3"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && storedUsers.length === 0 && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">No User Data Found</h2>
            <p className="text-gray-700">Please add users first.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPopup;
