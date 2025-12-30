import request from 'supertest';
import User from '../models/userModel.js';
import app from '../index.js';

describe('Auth - Signup', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'Test@123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.email).toBe('test@example.com');
  });
});

describe('Auth - Login failure', () => {
  it('should reject invalid password', async () => {
    await request(app).post('/api/auth/signup').send({
      fullName: 'User',
      email: 'fail@example.com',
      password: 'Test@123',
    });

    const res = await request(app).post('/api/auth/signin').send({
      email: 'fail@example.com',
      password: 'WrongPass',
    });

    expect(res.statusCode).toBe(401);
  });
});

describe('Auth - Inactive user login', () => {
  it('should block inactive users from logging in', async () => {
    await User.create({
      fullName: 'Inactive User',
      email: 'inactive@example.com',
      password: '$2a$10$hashedpassword',
      status: 'inactive',
    });

    const res = await request(app).post('/api/auth/signin').send({
      email: 'inactive@example.com',
      password: 'Test@123',
    });

    expect(res.statusCode).toBe(403);
  });
});

describe('Protected route', () => {
  it('should deny access without token', async () => {
    const res = await request(app).get('/api/auth/check');
    expect(res.statusCode).toBe(401);
  });
});

describe('Admin access control', () => {
  it('should block non-admin users', async () => {
    const signup = await request(app).post('/api/auth/signup').send({
      fullName: 'Normal User',
      email: 'user@example.com',
      password: 'Test@123',
    });

    const cookie = signup.headers['set-cookie'];

    const res = await request(app)
      .get('/api/admin/users/1')
      .set('Cookie', cookie);

    expect(res.statusCode).toBe(403);
  });
});
