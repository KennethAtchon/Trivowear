import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <div className="m-30px auto">
      {/* BILLING FORM */}
      <div>
        <h2 className="mb-15px text-xl">Billing Information</h2>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </div>

      <div className="mb-20px">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-primary-300 rounded"
            defaultChecked={values.shippingAddress.isSameAddress}
            onChange={() =>
              setFieldValue(
                "shippingAddress.isSameAddress",
                !values.shippingAddress.isSameAddress
              )
            }
          />
          <span className="ml-2">Same for Shipping Address</span>
        </label>
      </div>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && (
        <div>
          <h2 className="mb-15px text-xl">Shipping Information</h2>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default Shipping;
