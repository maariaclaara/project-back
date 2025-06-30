import request from 'supertest';
import app from '../src/app'; // seu express()
import { prisma } from '../src/prisma/client';
import jwt from 'jsonwebtoken';

const adminToken = jwt.sign({ userId: 1, role: 'ADMIN', email: 'admin@test.com' }, process.env.JWT_SECRET!, { expiresIn: '1h' });

describe('Admin - GET /admin/users', () => {
  it('deve listar usuários com autenticação de ADMIN', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(res.body.users)).toBe(true);
  });

  it('deve impedir acesso sem token', async () => {
    await request(app)
      .get('/admin/users')
      .expect(401);
  });

  it('deve impedir acesso de USER comum', async () => {
    const userToken = jwt.sign({ userId: 2, role: 'USER', email: 'user@test.com' }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    await request(app)
      .get('/admin/users')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
  });
});

describe('Admin - GET /admin/users/inactive-login', () => {
  it('deve retornar usuários inativos (último login > 30 dias)', async () => {
    const res = await request(app)
      .get('/admin/users/inactive-login')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    expect(Array.isArray(res.body.users)).toBe(true);
  });
});

