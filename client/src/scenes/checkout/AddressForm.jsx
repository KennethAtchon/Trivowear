import { getIn } from "formik";
import { useMediaQuery } from "react-responsive";
import { Grid, TextField } from "@mui/material";

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
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="First Name"
          name={formattedName("firstName")}
          value={values.firstName}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("firstName")}
          helperText={formattedHelper("firstName")}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Last Name"
          name={formattedName("lastName")}
          value={values.lastName}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("lastName")}
          helperText={formattedHelper("lastName")}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Country"
          name={formattedName("country")}
          value={values.country}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("country")}
          helperText={formattedHelper("country")}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Street Address"
          name={formattedName("street1")}
          value={values.street1}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("street1")}
          helperText={formattedHelper("street1")}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Street Address 2 (optional)"
          name={formattedName("street2")}
          value={values.street2}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("street2")}
          helperText={formattedHelper("street2")}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="City"
          name={formattedName("city")}
          value={values.city}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("city")}
          helperText={formattedHelper("city")}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="State"
          name={formattedName("state")}
          value={values.state}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("state")}
          helperText={formattedHelper("state")}
        />
      </Grid>

      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Zip Code"
          name={formattedName("zipCode")}
          value={values.zipCode}
          onBlur={handleBlur}
          onChange={handleChange}
          error={formattedError("zipCode")}
          helperText={formattedHelper("zipCode")}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
