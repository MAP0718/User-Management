Tech Stack
Frontend: React.js, Tailwind CSS[2][3]
API Communication: Axios
Icons: Lucide-React
Tooling: Vite, ESLint

Engineering Assumptions
Name Mapping: The API provides a single name string. I assumed the first word is the First Name and the rest is the Last Name.
Department Mapping: Since the API lacks a department field, I mapped the company.name property to serve as the Department.
Persistence: JSONPlaceholder is a mock API that doesn't persist changes. Added/edited users will disappear on refresh as per the project's requirement to fetch fresh data from the endpoint on load.

Challenges Faced
Mock API Limitations: The API returns a 500 error when trying to update or delete IDs greater than 10 (locally created IDs). I implemented a fallback to ensure the UI updates correctly even when the server call fails for these mock IDs.
Numerical Sorting: Standard array sorting treats "10" as smaller than "2". I implemented custom logic to ensure IDs are sorted numerically.

Future Improvements
Persistent Storage: Implementing localStorage or a real backend database to save changes permanently.
Unit Testing: Adding Vitest or Jest suites for component testing.
Enhanced Notifications: Replacing browser alerts with a toast notification system