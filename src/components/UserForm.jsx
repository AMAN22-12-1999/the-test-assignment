import { useState } from "react";

const UserForm = ({ onSubmit }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    seniority: 5,
    dob: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const generateUserId = () => {
    const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
    return storedUsers.length > 0 ? storedUsers[storedUsers.length - 1].userId + 1 : 1;
  };

  const generateEmpCode = (department) => {
    const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random number
    return department.substring(0, 3).toUpperCase() + randomNum;
  };

  const generateUniqueUserName = (department) => {
    let storedUsers = JSON.parse(localStorage.getItem("userData")) || [];
    let existingUsernames = new Set(storedUsers.map(user => user.userName));

    let newUserName;
    do {
      const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit random number
      newUserName = department.substring(0, 4).toLowerCase() + randomNum;
    } while (existingUsernames.has(newUserName));

    return newUserName;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.department) {
      alert("Please select a department!");
      return;
    }

    let storedUsers = JSON.parse(localStorage.getItem("userData"));
    if (!Array.isArray(storedUsers)) {
      storedUsers = [];
    }

    const newUser = {
      userId: generateUserId(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: user.department,
      seniority: parseFloat(user.seniority),
      dob: user.dob,
      empCode: generateEmpCode(user.department),
      userName: generateUniqueUserName(user.department), // Ensuring uniqueness
    };

    storedUsers.push(newUser);
    localStorage.setItem("userData", JSON.stringify(storedUsers));

    onSubmit();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Enter Employee Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={user.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={user.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-300 font-medium">Department</label>
            <select
              name="department"
              value={user.department}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            >
              <option value="" disabled>Select a department</option>
              <option value="Accounts">Accounts</option>
              <option value="Development">Development</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="text-gray-300 font-medium">Seniority (0 - 9.99)</label>
            <input
              type="range"
              name="seniority"
              min="0"
              max="9.99"
              step="0.01"
              value={user.seniority}
              onChange={handleChange}
              className="w-full cursor-pointer"
            />
            <p className="text-white text-sm mt-1">Level: {user.seniority}</p>
          </div>

          <div>
            <label className="text-gray-300 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:from-green-500 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Save Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
