# news-aggregator-api

✨ **Brief**

🎯 Objective: Build a RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

💡 **Project Description**: In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences (e.g., categories, sources). The API will then fetch news articles from multiple sources using external news APIs (e.g., NewsAPI). The fetched articles should be processed and filtered asynchronously based on user preferences.

📝 **Submission guidelines**

📌 Requirements:

1. Set up a basic Node.js project with Express.js and other necessary NPM packages.

2. Implement user registration and login using bcrypt and JWT for password hashing and token-based authentication.

3. Implement a RESTful API with the following endpoints:

   - `POST /register`: Register a new user.
   - `POST /login`: Log in a user.
   - `GET /preferences`: Retrieve the news preferences for the logged-in user.
   - `PUT /preferences`: Update the news preferences for the logged-in user.
   - `GET /news`: Fetch news articles based on the logged-in user's preferences.

4. Use external news APIs to fetch news articles from multiple sources. Incorporate async/await and Promises in the process of fetching news data and filtering it based on user preferences.

5. Implement proper error handling for invalid requests, authentication errors, and authorization errors.

6. Add input validation for user registration and news preference updates.

7. Test the API using Postman or Curl to ensure it works as expected. ✅

8. 🔍 Review the project from Week 2 and identify potential security vulnerabilities.

9. 🔒 Implement input validation and sanitization for user registration, event creation, and updates.

10. ⚡️ Optimize performance by implementing caching, if not done in the previous week's optional extension.

11. 🧪 Set up unit testing and write test cases for the API endpoints, focusing on testing input validation and proper functioning of CRUD operations. Make sure to achieve good test coverage and test edge cases.

12. 🔧 Refactor the API code to improve error handling, ensuring that appropriate error messages are returned for different types of errors (e.g., validation errors, authentication errors, authorization errors, and server errors).

13. ✅ Test the API using Postman or Curl to ensure it works as expected and that the implemented security measures are effective.
