import swaggerAutogen from 'swagger-autogen';

const swaggerAutogenInstance = swaggerAutogen();

const doc = {
  info: {
    title: 'Task API Documentation',
    description: 'API Documentation for Task Management',
  },
  host: 'localhost:3000', // Change this to your actual host
  schemes: ['http'],
  basePath: '/api',
  tags: [
    {
      name: 'Tasks',
      description: 'Operations related to tasks',
    },
  ],
  components: {
    schemas: {
      Task: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string' },
          completed: { type: 'boolean', default: false },
        },
      },
      TaskUpdate: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          completed: { type: 'boolean' },
        },
      },
      TaskID: {
        type: 'string',
        description: 'Unique identifier for the task',
      },
    },
  },
  paths: {
    '/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Fetch all tasks',
        responses: {
          200: {
            description: 'A list of tasks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Task' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create a new task',
        requestBody: {
          description: 'Task details',
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Task' },
            },
          },
        },
        responses: {
          201: {
            description: 'Task created successfully',
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
    '/tasks/{id}': {
      patch: {
        tags: ['Tasks'],
        summary: "Update a task's completion status",
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { $ref: '#/components/schemas/TaskID' },
          },
        ],
        requestBody: {
          description: 'Task update data',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskUpdate' },
            },
          },
        },
        responses: {
          200: {
            description: 'Task updated successfully',
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'Task not found',
          },
        },
      },
      put: {
        tags: ['Tasks'],
        summary: 'Edit a task',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { $ref: '#/components/schemas/TaskID' },
          },
        ],
        requestBody: {
          description: 'Task edit data',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TaskUpdate' },
            },
          },
        },
        responses: {
          200: {
            description: 'Task edited successfully',
          },
          400: {
            description: 'Bad request',
          },
          404: {
            description: 'Task not found',
          },
        },
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete a task',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { $ref: '#/components/schemas/TaskID' },
          },
        ],
        responses: {
          200: {
            description: 'Task deleted successfully',
          },
          404: {
            description: 'Task not found',
          },
        },
      },
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/taskRoute.js'];

swaggerAutogenInstance(outputFile, endpointsFiles, doc);
