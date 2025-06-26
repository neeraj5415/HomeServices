import { useState } from "react";
import axios from "axios";

export default function AddServiceForm({ onServiceAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/services", formData);
      onServiceAdded(); // notify parent to refetch
      setFormData({ name: "", description: "", image: "" }); // reset
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-red-50 p-6 rounded-lg shadow mb-8">
      <h3 className="text-xl font-semibold mb-4">Add New Service</h3>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          placeholder="Service Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Create Service
      </button>
    </form>
  );
}