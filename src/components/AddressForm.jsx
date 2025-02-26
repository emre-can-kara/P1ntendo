import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axios';
import { fetchAddresses } from '../store/actions/orderActions';

// Turkish cities array (you can move this to a separate file)
const cities = [
  'Adana', 'Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya', 'Konya',
  // ... add more cities
];

function AddressForm({ onClose, editAddress = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: editAddress ? {
      title: editAddress.title,
      name: editAddress.name.split(' ')[0], // Assuming name and surname are space-separated
      surname: editAddress.name.split(' ')[1],
      phone: editAddress.phone,
      city: editAddress.city,
      district: editAddress.district,
      neighborhood: editAddress.neighborhood,
      address: editAddress.address
    } : {}
  });
  
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      if (editAddress) {
        // Update existing address
        await axiosInstance.put('/user/address', {
          id: editAddress.id,
          title: data.title,
          name: `${data.name} ${data.surname}`,
          phone: data.phone,
          city: data.city,
          district: data.district,
          neighborhood: data.neighborhood,
          address: data.address
        });
        toast.success('Address updated successfully');
      } else {
        // Add new address
        await axiosInstance.post('/user/address', {
          title: data.title,
          name: `${data.name} ${data.surname}`,
          phone: data.phone,
          city: data.city,
          district: data.district,
          neighborhood: data.neighborhood,
          address: data.address
        });
        toast.success('Address added successfully');
      }
      
      dispatch(fetchAddresses()); // Refresh address list
      onClose(); // Close the form
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${editAddress ? 'update' : 'add'} address`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editAddress ? 'Edit Address' : 'Add New Address'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Address Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Address title is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Name & Surname */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surname
              </label>
              <input
                type="text"
                {...register("surname", { required: "Surname is required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.surname && (
                <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "Please enter a valid phone number"
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="05XXXXXXXXX"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <select
              {...register("city", { required: "City is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a city</option>
              {cities.map(city => (
                <option key={city} value={city.toLowerCase()}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              District
            </label>
            <input
              type="text"
              {...register("district", { required: "District is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.district && (
              <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>
            )}
          </div>

          {/* Neighborhood */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Neighborhood
            </label>
            <input
              type="text"
              {...register("neighborhood", { required: "Neighborhood is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.neighborhood && (
              <p className="mt-1 text-sm text-red-600">{errors.neighborhood.message}</p>
            )}
          </div>

          {/* Detailed Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Detailed Address
            </label>
            <textarea
              {...register("address", { required: "Address details are required" })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Street, building and door numbers..."
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? (editAddress ? "Updating..." : "Adding...") : (editAddress ? "Update Address" : "Add Address")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddressForm; 