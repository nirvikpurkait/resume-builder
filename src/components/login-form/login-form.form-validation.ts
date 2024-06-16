import { RegisterOptions } from "react-hook-form";
import { TLoginFormData } from "./login-form";

type ValidationFields = keyof TLoginFormData;

let registerOptions: RegisterOptions = {} as RegisterOptions;

export function validationRuleOf(
  fieldName: ValidationFields
): RegisterOptions | undefined {
  switch (fieldName) {
    case "username": {
      registerOptions = {
        required: {
          value: true,
          message: "Username is required",
        },
      };
      return registerOptions;
    }
    case "password": {
      registerOptions = {
        required: {
          value: true,
          message: "Password is required",
        },

        // ! uncomment the below section, commented for developmemt purpose
        // validate: {
        //   isCorrectRegex: (value: string) => {
        //     const passwordRegex =
        //       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,16}$/gm;
        //     if (!passwordRegex.test(value)) {
        //       return "Please provide valid password combination";
        //     }
        //   },
        // },
      };
      return registerOptions;
    }
    case "role": {
      registerOptions = {
        required: {
          message: "Please select a role to proceed",
          value: true,
        },
        validate: {
          checkSelectedRoleType: (value: string) => {
            if (!(value === "ADMIN" || value === "STUDENT")) {
              return "Please select correct role.";
            }
          },
        },
      };
      return registerOptions;
    }
    default:
      return;
  }

  // if (fieldName === "username") {
  //   registerOptions = {
  //     required: {
  //       value: true,
  //       message: "Username is required",
  //     },
  //   };
  //   return registerOptions;
  // }

  // if (fieldName === "password") {
  //   registerOptions = {
  //     required: {
  //       value: true,
  //       message: "Password is required",
  //     },

  //     // ! uncomment the below section, commented for developmemt purpose
  //     validate: {
  //       isCorrectRegex: (value: string) => {
  //         const passwordRegex =
  //           /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,16}$/gm;
  //         if (!passwordRegex.test(value)) {
  //           return "Please provide valid password combination";
  //         }
  //       },
  //     },
  //   };
  //   return registerOptions;
  // }

  // if (fieldName === "role") {
  //   registerOptions = {
  //     required: {
  //       message: "Please select a role to proceed",
  //       value: true,
  //     },
  //     validate: {
  //       checkSelectedRoleType: (value: string) => {
  //         if (!(value === "ADMIN" || value === "STUDENT")) {
  //           return "Please select correct role.";
  //         }
  //       },
  //     },
  //   };
  //   return registerOptions;
  // }
  // return;
}
