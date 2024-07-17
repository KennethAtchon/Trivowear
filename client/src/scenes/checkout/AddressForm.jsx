import { getIn } from "formik";
import { useMediaQuery } from "react-responsive";

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery({ query: "(min-width: 600px)" });

  // these functions allow for better code readability
  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <div
      className={`grid gap-4 ${
        isNonMobile ? "grid-cols-4" : "grid-cols-1"
      }`}
    >
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name={formattedName("firstName")}
          value={values.firstName}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("firstName") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("firstName") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("firstName")}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name={formattedName("lastName")}
          value={values.lastName}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("lastName") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("lastName") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("lastName")}</p>
        )}
      </div>

      <div className="col-span-4">
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          name={formattedName("country")}
          value={values.country}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("country") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("country") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("country")}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Street Address</label>
        <input
          type="text"
          name={formattedName("street1")}
          value={values.street1}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("street1") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("street1") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("street1")}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Street Address 2 (optional)</label>
        <input
          type="text"
          name={formattedName("street2")}
          value={values.street2}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("street2") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("street2") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("street2")}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name={formattedName("city")}
          value={values.city}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("city") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("city") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("city")}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name={formattedName("state")}
          value={values.state}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("state") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("state") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("state")}</p>
        )}
      </div>

      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700">Zip Code</label>
        <input
          type="text"
          name={formattedName("zipCode")}
          value={values.zipCode}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            formattedError("zipCode") ? "border-red-500" : ""
          }`}
        />
        {formattedHelper("zipCode") && (
          <p className="mt-2 text-sm text-red-600">{formattedHelper("zipCode")}</p>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
