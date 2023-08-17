# Field Input Validation and Dynamic Validation Setting

## Project Overview
This repository contains code enhancements for the existing form builder application, focusing on improving input field validation and introducing dynamic user-defined validation rules. The goal is to ensure data integrity and accuracy by validating user inputs based on predefined field types and enabling users to define custom validation rules through the interface.

## Table of Contents
1. [Installation](#installation)
2. [Field Input Validation](#field-input-validation)
3. [Dynamic Validation Setting](#dynamic-validation-setting)
4. [Technologies Used](#technologies-used)
5. [Development Approach](#development-approach)
6. [Usage](#usage)

## Installation
1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install any necessary dependencies using `npm install` or `yarn install`.

## Field Input Validation
In this section, we describe how input field validation is implemented based on predefined field types.
- Each input field is assigned a specific type (ParamType.Number, ParamType.String, ParamType.Date and ParamType.Boolean).
- Validation is triggered upon the blur event for each field.
- For ParamType.Number fields, non-numeric characters or symbols are not allowed. An error message is displayed if validation fails.
- For ParamType.String fields, any character input is accepted without validation.
- For ParamType.Date fields, valid date input is accepted with validation. An error message is displayed if validation fails.
- For ParamType.Boolean fields, valid boolean input is accepted without validation.

## Dynamic Validation Setting
This section outlines the dynamic user-defined validation rules feature.
- The interface allows users to define additional validation rules without modifying the codebase.
- Users can set rules such as greater than or equal to 5, capital letter start, email format, no special characters, and valid date.

## Technologies Used
- Frontend: React, Redux, HTML, CSS, JavaScript
- Validation Library: [yup](https://github.com/jquense/yup)

## Development Approach
The development of this enhancement was done as follows:
1. **Primary Validations:** The `yup` validation library was integrated into the application to perform primary input validations based on predefined field types (ParamType.Number, ParamType.Date and ParamType.String).
2. **Dynamic Validations:** Utilizing the flexibility of `yup`, dynamic validation rules were implemented through the interface. Users can define and apply custom validation rules such as numeric limits, specific patterns, and more.

## Usage
1. Start the application by running `npm run dev`.
2. Navigate to the designated input fields within the application.
3. Observe the input validation behavior based on field types (ParamType.Number, ParamType.Date or ParamType.String).
4. Experiment with the dynamic validation setting feature by defining and applying user-defined rules through the interface.

Feel free to contact me if you have any questions or need further assistance.

**Contact:**  
For inquiries, please email [saku.work.2k23@gmail.com](mailto:saku.work.2k23@gmail.com).
