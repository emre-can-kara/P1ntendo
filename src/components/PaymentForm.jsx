import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from '../store/actions/orderActions';

function PaymentForm({ onClose, editCard = null }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: editCard ? {
      cardNumber: editCard.card_no,
      nameOnCard: editCard.name_on_card,
      expiryMonth: editCard.expire_month.toString(),
      expiryYear: editCard.expire_year.toString()
    } : {}
  });
  
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      if (editCard) {
        await dispatch(updateCard({
          id: editCard.id,
          card_no: data.cardNumber.replace(/\s/g, ''),
          expire_month: parseInt(data.expiryMonth),
          expire_year: parseInt(data.expiryYear),
          name_on_card: data.nameOnCard
        }));
      } else {
        await dispatch(addCard({
          card_no: data.cardNumber.replace(/\s/g, ''),
          expire_month: parseInt(data.expiryMonth),
          expire_year: parseInt(data.expiryYear),
          name_on_card: data.nameOnCard
        }));
      }
      onClose();
    } catch (error) {
      console.error('Failed to handle card:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Card</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^\d{16}$/,
                  message: "Please enter a valid 16-digit card number"
                }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="1234123412341234"
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
            )}
          </div>

          {/* Name on Card */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input
              type="text"
              {...register("nameOnCard", { required: "Name on card is required" })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.nameOnCard && (
              <p className="mt-1 text-sm text-red-600">{errors.nameOnCard.message}</p>
            )}
          </div>

          {/* Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Month
              </label>
              <select
                {...register("expiryMonth", { required: "Required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const month = i + 1;
                  return (
                    <option key={month} value={month}>
                      {month.toString().padStart(2, '0')}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Year
              </label>
              <select
                {...register("expiryYear", { required: "Required" })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Adding..." : "Add Card"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm; 