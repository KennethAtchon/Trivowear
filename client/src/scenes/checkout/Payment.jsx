const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <div className="m-30px 0">
      {/* CONTACT INFO */}
      <div>
        <h2 className="mb-15px text-xl">Contact Info</h2>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded ${
            touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"
        />
        {touched.email && errors.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
        <input
          type="text"
          className={`w-full px-3 py-2 mt-3 border rounded ${
            touched.phoneNumber && errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
