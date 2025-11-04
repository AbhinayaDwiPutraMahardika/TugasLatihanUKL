import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * CREATE USER
   */
  async create(data: any) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return this.prisma.user.create({
    data: {
      name: data.name,        // ✅ ambil dari request body
      username: data.username,
      password: hashedPassword,
      role: data.role || 'user',
    },
  });
}


  /**
   * GET ALL USERS
   */
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  /**
   * GET USER BY ID
   */
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
   * UPDATE USER (umumnya dipakai untuk update profil)
   */
  async update(id: number, data: any) {
    // Jika password ikut diupdate, hash lagi di controller sebelum dikirim ke sini
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
  }

  /**
   * DELETE USER
   */
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
      },
    });
  }
}