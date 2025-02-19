import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; // ✅ React Router v5
import axiosInstance from "../utils/axios";
import { useDispatch } from 'react-redux';
import { signupUser } from '../store/actions/clientActions';
import { toast } from 'react-toastify';

function SignupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [roles, setRoles] = useState([]); // Stores fetched roles
  const [loading, setLoading] = useState(false); // Spinner state
  const [errorMessage, setErrorMessage] = useState(""); // Stores backend errors
  const [role, setRole] = useState('customer'); // default to customer

  const [formData, setFormData] = useState({
    name: "", // ✅ Backend expects `name`
    email: "",
    password: "",
    confirmPassword: "",
    role_id: "", // Set dynamically
    agreeToTerms: false, // ✅ Agree to terms checkbox
    // Mağaza için ek alanlar
    store_name: "",
    store_phone: "",
    tax_no: "",
    bank_account: "",
  });

  // Fetch roles when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roles"); // ✅ Fetch roles from API
        setRoles(response.data); // ✅ Store roles in state
        setFormData((prev) => ({
          ...prev,
          role_id:
            response.data.find((role) => role.name === "Customer")?.id ||
            response.data[0]?.id,
        }));
      } catch (error) {
        console.error("Error fetching roles:", error.response?.data || error.message);
      }
    };

    fetchRoles();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Role değiştiğinde konsola yazdırarak kontrol edelim
    if (name === "role_id") {
      console.log("Selected role:", value);
      console.log("Is store role:", roles.find(role => role.id === parseInt(value))?.name === "Mağaza");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // İsim validasyonu
    if (formData.name.length < 3) {
      setLoading(false);
      setErrorMessage("İsim en az 3 karakter olmalıdır");
      return;
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setLoading(false);
      setErrorMessage("Geçerli bir e-posta adresi giriniz");
      return;
    }

    // Şifre validasyonu
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setLoading(false);
      setErrorMessage("Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir");
      return;
    }

    // Şifre eşleşme kontrolü (zaten mevcut)
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      alert("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      setLoading(false);
      alert("You must agree to the terms and conditions!");
      return;
    }

    // Mağaza validasyonları
    if (formData.role_id && roles.find(role => role.id === parseInt(formData.role_id))?.name === "Mağaza") {
      // Mağaza adı kontrolü
      if (formData.store_name.length < 3) {
        setLoading(false);
        setErrorMessage("Mağaza adı en az 3 karakter olmalıdır");
        return;
      }

      // Telefon numarası kontrolü
      const phoneRegex = /^(\+90|0)?\s*5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}$/;
      if (!phoneRegex.test(formData.store_phone)) {
        setLoading(false);
        setErrorMessage("Geçerli bir Türkiye telefon numarası giriniz");
        return;
      }

      // Vergi numarası kontrolü
      const taxNoRegex = /^T\d{3}V\d{6}$/;
      if (!taxNoRegex.test(formData.tax_no)) {
        setLoading(false);
        setErrorMessage("Geçerli bir vergi numarası giriniz (TXXXVXXXXXX formatında)");
        return;
      }

      // IBAN kontrolü
      const ibanRegex = /^TR\d{2}\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{2}$/;
      if (!ibanRegex.test(formData.bank_account)) {
        setLoading(false);
        setErrorMessage("Geçerli bir IBAN numarası giriniz");
        return;
      }
    }

    // ✅ Prepare the request payload
    let requestData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: parseInt(formData.role_id)
    };

    // Eğer mağaza rolü seçilmişse store objesi ekle
    if (roles.find(role => role.id === parseInt(formData.role_id))?.name === "Mağaza") {
      requestData = {
        ...requestData,
        store: {
          name: formData.store_name,
          phone: formData.store_phone,
          tax_no: formData.tax_no,
          bank_account: formData.bank_account
        }
      };
    }

    try {
      await dispatch(signupUser(requestData));
      toast.success('Kayıt başarılı!');
      history.push('/login');
    } catch (error) {
      setLoading(false);
      console.error("Signup Error:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "An error occurred during signup");
    }
  };

  // Mağaza alanlarını gösterme kontrolü için düzeltme
  const isStoreRole = roles.find(role => role.id === parseInt(formData.role_id))?.name === "Mağaza";

  // Debug için useEffect'i tutalım
  useEffect(() => {
    console.log("Current roles:", roles);
    console.log("Current formData:", formData);
    console.log("Is store role:", isStoreRole);
  }, [roles, formData, isStoreRole]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link 
            to="/login" 
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                name="name"
                type="text"
                required
                minLength={3}
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">En az 3 karakter giriniz</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Geçerli bir e-posta adresi giriniz</p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select 
                name="role_id" 
                value={formData.role_id} 
                onChange={handleChange} 
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Rol Seçiniz</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Debug bilgisi */}
            <div className="text-xs text-gray-500">
              Current Role ID: {formData.role_id}
              <br />
              Is Store Role: {isStoreRole ? "Yes" : "No"}
            </div>

            {/* Mağaza için ek alanlar */}
            {isStoreRole && (
              <>
                {/* Mağaza Adı */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mağaza Adı</label>
                  <input
                    name="store_name"
                    type="text"
                    required
                    minLength={3}
                    value={formData.store_name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">En az 3 karakter giriniz</p>
                </div>

                {/* Mağaza Telefonu */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mağaza Telefonu</label>
                  <input
                    name="store_phone"
                    type="tel"
                    required
                    pattern="^(\+90|0)?\s*5\d{2}\s*\d{3}\s*\d{2}\s*\d{2}$"
                    value={formData.store_phone}
                    onChange={handleChange}
                    placeholder="+90 5XX XXX XX XX"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Türkiye telefon formatında giriniz</p>
                </div>

                {/* Vergi Numarası */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vergi Numarası</label>
                  <input
                    name="tax_no"
                    type="text"
                    required
                    pattern="^T\d{3}V\d{6}$"
                    value={formData.tax_no}
                    onChange={handleChange}
                    placeholder="TXXXVXXXXXX"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">TXXXVXXXXXX formatında giriniz</p>
                </div>

                {/* IBAN */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Banka Hesabı (IBAN)</label>
                  <input
                    name="bank_account"
                    type="text"
                    required
                    pattern="^TR\d{2}\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{2}$"
                    value={formData.bank_account}
                    onChange={handleChange}
                    placeholder="TR__ ____ ____ ____ ____ ____ __"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Geçerli bir IBAN numarası giriniz</p>
                </div>
              </>
            )}

            {/* Agree to Terms */}
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button with Spinner */}
            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {loading ? "Processing..." : "Sign Up"}
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
