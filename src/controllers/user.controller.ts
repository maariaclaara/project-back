// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { updateUserSchema } from '../schemas/user.schema';
import bcrypt from 'bcrypt';
import { AuthenticatedRequest } from '../middlewares/authenticate';

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const requesterId = req.user?.userId;
  const requesterRole = req.user?.role;

  const isOwner = requesterId === Number(id);
  const isAdmin = requesterRole === 'ADMIN';

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ message: 'Você não tem permissão para editar este usuário' });
  }

  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.format() });
  }

  const { name, email, password } = parsed.data;
  const updateData: any = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    updateData.password = hashed;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    const accessToken = jwt.sign(
      {
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({
      message: 'Usuário atualizado com sucesso',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
      accessToken,
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário', error });
  }
};
