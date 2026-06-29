User Management Dashboard

A simple and responsive web application built with React to manage user details
using the JSONPlaceholder mock backend API. This dashboard allows users to view,
add, edit, and delete user records with integrated search, sorting, and
pagination.

Setup and Run Instructions

Prerequisites

  - Node.js (Version 18 or higher recommended)
  - npm (Node Package Manager)

Installation

1.  Clone or download the source code to your local machine.
2.  Open your terminal and navigate to the project root directory:
    cd user-management-app
3.  Install the necessary dependencies:
    npm install

Running the Application

1.  Start the development server:
    npm run dev
2.  Open your browser and navigate to the local URL provided by Vite (usually
    http://localhost:5173).

Folder Structure

src/
├── api/
│   └── userService.js        # Axios API service layer
├── components/
│   ├── FilterPopup.jsx       # Multi-field filtering modal
│   ├── Pagination.jsx        # Navigation and limit controls
│   ├── UserForm.jsx          # Add/Edit user modal with validation
│   └── UserTable.jsx         # Data display and sorting
├── utils/
│   └── validators.js         # Client-side form validation logic
├── App.jsx                   # Main application state and logic
├── index.css                 # Tailwind CSS directives
└── main.jsx                  # Application entry point

Engineering Assumptions

1.  Name Mapping: The JSONPlaceholder API provides a single name field. For the
    purpose of this dashboard, I assumed the first word of the string represents
    the First Name and the remaining part represents the Last Name.
2.  Department Mapping: Since the API does not include a specific department
    field, I mapped the company.name property from the API response to serve as
    the user's Department.
3.  Data Persistence: JSONPlaceholder is a mock REST API that does not persist
    changes to its server. While the application successfully sends POST, PUT,
    and DELETE requests, the data resets to its original state upon page
    refresh.

Challenges Faced and Reflections

1.  Mock API Limitations (500 Errors): A major challenge was handling updates
    and deletions for users added locally. The mock API only recognizes IDs 1
    through 10. Attempting to modify an ID greater than 10 results in a 500
    Server Error. I implemented logic to catch these specific errors and update
    the local application state regardless, ensuring a seamless experience for
    the user.
2.  Numerical Sorting Logic: Standard JavaScript array sorting can treat IDs as
    strings, placing "10" before "2". I implemented custom numerical comparison
    logic to ensure the ID column remains strictly serial and sorted correctly.
3.  Responsive Design: Tables are difficult to display on small mobile screens.
    I utilized Tailwind CSS with overflow-x-auto containers to ensure the data
    remains accessible without breaking the layout, along with flexible flexbox
    layouts for the header controls.

