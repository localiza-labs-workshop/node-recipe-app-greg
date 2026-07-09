const request = require('supertest');
const express = require('express');
const routes = require('../src/routes');
const { initializeTestDb } = require('./test-database');

// Mock the database module to use test database
jest.mock('../src/database', () => ({
  getDbConnection: () => require('./test-database').getTestDbConnection()
}));

// Simple app setup for testing
function createTestApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Simple mock for res.render
  app.use((req, res, next) => {
    res.render = (view, locals) => res.json({ view, locals });
    next();
  });
  
  app.use('/', routes);
  return app;
}

describe('Routes', () => {
  let app;
  let db;

  beforeEach(async () => {
    app = createTestApp();
    db = await initializeTestDb();
  });

  afterEach(async () => {
    if (db) {
      await db.close();
    }
  });

  test('GET / should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.view).toBe('home');
  });

  test('GET /weather should return mocked weather', async () => {
    const response = await request(app).get('/weather');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      location: 'Belo Horizonte',
      temperatureCelsius: 24,
      condition: 'Sunny'
    });
  });

  test('GET /weather should override location from query parameter', async () => {
    const response = await request(app).get('/weather?location=SaoPaulo');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      location: 'SaoPaulo',
      temperatureCelsius: 24,
      condition: 'Sunny'
    });
  });

  test('POST /recipes should create a new recipe', async () => {
    const newRecipe = {
      title: 'New Test Recipe',
      ingredients: 'New test ingredients',
      method: 'New test method'
    };

    const response = await request(app)
      .post('/recipes')
      .send(newRecipe);

    expect(response.status).toBe(302); // Redirect status
    expect(response.headers.location).toBe('/recipes');

    // Verify recipe was created
    const recipe = await db.get('SELECT * FROM recipes WHERE title = ?', [newRecipe.title]);
    expect(recipe).toBeDefined();
    expect(recipe.title).toBe(newRecipe.title);
  });

  test('POST /recipes should return 400 when title is empty', async () => {
    const response = await request(app)
      .post('/recipes')
      .send({
        title: '   ',
        ingredients: 'Ingredients',
        method: 'Method'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Title is required');

    const recipe = await db.get('SELECT * FROM recipes WHERE ingredients = ? AND method = ?', ['Ingredients', 'Method']);
    expect(recipe).toBeUndefined();
  });

  test('DELETE /recipes/:id should delete recipe and GET should return 404', async () => {
    const result = await db.run(
      'INSERT INTO recipes (title, ingredients, method) VALUES (?, ?, ?)',
      ['Recipe To Delete', 'Ingredient', 'Method']
    );
    const recipeId = result.lastID;

    const deleteResponse = await request(app).delete(`/recipes/${recipeId}`);
    expect(deleteResponse.status).toBe(204);

    const response = await request(app).get(`/recipes/${recipeId}`);
    expect(response.status).toBe(404);
  });
});