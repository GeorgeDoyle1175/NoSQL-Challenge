# Social Network API

This is the README file for the Social Network API.

## Description

The Social Network API is a backend application that provides API routes for managing users, thoughts, reactions, and friends in a social network platform.

## Usage

To use the Social Network API, follow these steps:

1. Ensure that the application is running and the server is started.
2. Use a tool like Insomnia to send HTTP requests to the API routes.

## API Routes

The Social Network API includes the following API routes:

### Users

- `GET /api/users`: Retrieves all users from the database.
- `GET /api/users/:userId`: Retrieves a specific user by their ID.
- `POST /api/users`: Creates a new user.
- `PUT /api/users/:userId`: Updates a user by their ID.
- `DELETE /api/users/:userId`: Deletes a user by their ID.

### Thoughts

- `GET /api/thoughts`: Retrieves all thoughts from the database.
- `GET /api/thoughts/:thoughtId`: Retrieves a specific thought by its ID.
- `POST /api/thoughts`: Creates a new thought.
- `PUT /api/thoughts/:thoughtId`: Updates a thought by its ID.
- `DELETE /api/thoughts/:thoughtId`: Deletes a thought by its ID.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Creates a new reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Deletes a reaction to a thought by its ID.

### Friends

- `POST /api/users/:userId/friends/:friendId`: Adds a friend to a user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Removes a friend from a user's friend list.

## Testing

To test the API routes, use a tool like Insomnia to send HTTP requests to the corresponding routes mentioned above. Ensure that the server is running and the application is connected to a MongoDB database.

## Mock-Up

Here is a mock-up demonstrating the usage of the Social Network API:

## Contributing

If you want to contribute to the Social Network API, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -am 'Add some feature'`
4. Push the changes to your branch: `git push origin feature/your-feature-name`
5. Open a pull request.
