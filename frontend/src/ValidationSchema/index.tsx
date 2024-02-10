import * as Yup from "yup";

export const AdminLoginSchema = Yup.object({
    email: Yup.string().max(255,"Email must not be greater than 255 characters.").matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/ , 'Email must be a valid email address.').required("Email field is required."),
    password: Yup.string().max(255,"Password must not be greater than 255 characters.").required("Password is required."),
});


export const UserAddSchema = Yup.object({

    firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name must only contain characters")
    .test(
      "firstName-length",
      "First name must be between 3 and 30 characters",
      function (value) {
        if (value) {
          return value.length >= 3 && value.length <= 30;
        }
        return true;
      }
    )
    .required("First name is required"),

    lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name must only contain characters")
    .test(
      "lastName-length",
      "Last name must be between 3 and 30 characters",
      function (value) {
        if (value) {
          return value.length >= 3 && value.length <= 30;
        }
        return true;
      }
    )
    .required("Last name is required"),

    phone_no: Yup.string()
    .matches(/^[0-9]+$/, "Phone number only contain numbers")
    .test(
      "phone-length",
      "Phone number must be between 10 and 15 numbers",
      function (value) {
        if (value) {
          return value.length >= 10 && value.length <= 15;
        }
        return true;
      })
    .required("Phone number is required"),

    email: Yup.string()
      .nullable()
      .email("Invalid email address")
      .matches(
        /^[^\s@]+@[^\s@]+\.(?:com|tech|io|in|net|org|com\.au)$/,
        "Please provide a valid email address with a domain name"
      ).required("Email is required"),
    
    password: Yup.string().max(255,"Password must not be greater than 255 characters.").required("Password field is required."),
    passwordConfirmation: Yup.string()
     .oneOf([Yup.ref('password')], 'Password and Confirm Password did not Match'),

    image: Yup.mixed()
    .required("Image is required")
    .test(
      "image-format",
      "Invalid image format. Only jpg, jpeg, png, heif formats are allowed.",
      function (value:any) {
        if (value) {
          const imageFormats = ["image/jpeg", "image/jpg", "image/png", "image/heif"];
          const fileFormat = value.type;
          return imageFormats.includes(fileFormat);
        }
        return true;
      }
    )
    .test(
      "file-size",
      "Image size is too large. Maximum allowed size is 5MB.",
      function (value:any) {
        if (value) {
          const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
          return value.size <= maxSizeInBytes;
        }
        return true;
      }
    )

});

export const UserUpdateSchema = Yup.object({

    firstName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "First name must only contain characters")
    .test(
      "firstName-length",
      "First name must be between 3 and 30 characters",
      function (value) {
        if (value) {
          return value.length >= 3 && value.length <= 30;
        }
        return true;
      }
    )
    .required("First name is required"),

    lastName: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last name must only contain characters")
    .test(
      "lastName-length",
      "Last name must be between 3 and 30 characters",
      function (value) {
        if (value) {
          return value.length >= 3 && value.length <= 30;
        }
        return true;
      }
    )
    .required("Last name is required"),

    phone_no: Yup.string()
    .matches(/^[0-9]+$/, "Phone number only contain numbers")
    .test(
      "phone-length",
      "Phone number must be between 10 and 15 numbers",
      function (value) {
        if (value) {
          return value.length >= 10 && value.length <= 15;
        }
        return true;
      })
    .required("Phone number is required"),

    email: Yup.string()
      .nullable()
      .email("Invalid email address")
      .matches(
        /^[^\s@]+@[^\s@]+\.(?:com|tech|io|in|net|org|com\.au)$/,
        "Please provide a valid email address with a domain name"
      ).required("Email is required"),

    image: Yup.mixed()
    .test(
      "image-format",
      "Invalid image format. Only jpg, jpeg, png, heif formats are allowed.",
      function (value:any) {
        if (value) {
          const imageFormats = ["image/jpeg", "image/jpg", "image/png", "image/heif"];
          const fileFormat = value.type;
          return imageFormats.includes(fileFormat);
        }
        return true;
      }
    )
    .test(
      "file-size",
      "Image size is too large. Maximum allowed size is 5MB.",
      function (value:any) {
        if (value) {
          const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
          return value.size <= maxSizeInBytes;
        }
        return true;
      }
    )

});

export const RoleAddSchema = Yup.object({

  name: Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Name must only contain characters")
  .test(
    "name-length",
    "Name must be between 3 and 30 characters",
    function (value) {
      if (value) {
        return value.length >= 3 && value.length <= 30;
      }
      return true;
    }
  )
  .required("Name is required"),
});

export const RoleUpdateSchema = Yup.object({

  name: Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Name must only contain characters")
  .test(
    "name-length",
    "Name must be between 3 and 30 characters",
    function (value) {
      if (value) {
        return value.length >= 3 && value.length <= 30;
      }
      return true;
    }
  )
  .required("Name is required"),
});

export const ProjectAddSchema = Yup.object({

  projects: Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Project name must only contain characters")
  .test(
    "projects-length",
    "Project name must be between 3 and 30 characters",
    function (value) {
      if (value) {
        return value.length >= 3 && value.length <= 30;
      }
      return true;
    }
  )
  .required("Project name is required"),
});

export const ProjectUpdateSchema = Yup.object({

  projects: Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Project name must only contain characters")
  .test(
    "projects-length",
    "Project name must be between 3 and 30 characters",
    function (value) {
      if (value) {
        return value.length >= 3 && value.length <= 30;
      }
      return true;
    }
  )
  .required("Project name is required"),
});

export const IssueSchema = Yup.object({

  issues: Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Title must only contain characters")
  .test(
    "issues-length",
    "Title must be between 3 and 30 characters",
    function (value) {
      if (value) {
        return value.length >= 3 && value.length <= 30;
      }
      return true;
    }
  )
  .required("Title is required"),
});

export const UpdateIssueSchema = Yup.object({

  issues: Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Title must only contain characters")
  .test(
    "issues-length",
    "Title must be between 3 and 30 characters",
    function (value) {
      if (value) {
        return value.length >= 3 && value.length <= 30;
      }
      return true;
    }
  )
  .required("Title is required"),
});



