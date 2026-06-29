# User Management Dashboard

In this project, let's build a **User Management Dashboard** by applying the concepts we have learned till now.

### Refer to the video below:

<p>LINK URL FOR REPOSITORY : https://github.com/MAO0718/user-management-app </p>
<p>DEMO LINK : https://user-management-bice-gamma.vercel.app  </p>


<br/>
<div style="text-align: center;">
  
</div>
<br/>

### Design Files

<details>
<summary>Click to view</summary>

<div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
  <p><strong>Desktop View:</strong> High-level table view with Search and Filter controls.</p>
  <p><strong>Mobile View:</strong> Responsive overflow-x table with touch-friendly action buttons.</p>
  <p><strong>Form Modal:</strong> Centered pop-up for adding and editing user details.</p>
</div>

</details>

<br/>

### Project Overview

This application demonstrates a full CRUD (Create, Read, Update, Delete) workflow using a mock REST API. It features a clean, responsive interface and handles common data-management tasks like sorting, filtering, and pagination.

### Key Features

- **Fetch & View:** Display a list of users from the JSONPlaceholder API.
- **Add & Edit:** Modal-based forms with client-side validation for user details.
- **Delete:** Safety confirmation prompt before removing a record.
- **Search:** Real-time search by name or email.
- **Filter:** Targeted filtering by first name, last name, email, and department.
- **Numerical Sorting:** Custom logic to ensure IDs are sorted 1, 2, 3... 10.
- **Pagination:** Selectable row limits (10, 25, 50, 100).

### Tech Stack & Concepts Learned

- **React Hooks:** Managed application state using `useState`, `useEffect`, and `useMemo`.
- **API Integration:** Utilized `Axios` for handling GET, POST, PUT, and DELETE requests.
- **Responsive UI:** Built a mobile-first layout using `Tailwind CSS`.
- **Data Mapping:** Transformed external API data (splitting names and mapping company to department).
- **Error Handling:** Implemented catch blocks to handle mock API 500 errors and network failures.

### Engineering Assumptions

- **Name Logic:** The API `name` string is split into First and Last names using space as a delimiter.
- **Department Logic:** The `company.name` field is used as a fallback for the Department field.
- **Persistence:** Since the API is a read-only mock, data changes are reflected locally in the state but reset upon page refresh.

### Setup Instructions

1.  Navigate to the project directory: `cd user-management-app`
2.  Install dependencies: `npm install`
3.  Run the application: `npm run dev`
