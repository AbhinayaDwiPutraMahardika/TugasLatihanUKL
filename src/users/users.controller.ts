import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * REGISTER USER
   * POST /users
   * body: { name, username, password }
   */
  @Post()
  async create(@Body() createUserDto: any) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.usersService.create({
      name: createUserDto.name,
      username: createUserDto.username,
      password: hashedPassword,
      role: 'user',
    });
  }

  /**
   * GET ALL USERS
   * GET /users
   * hanya admin
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    if (req.user.role !== 'admin') {
      return { message: 'Forbidden: hanya admin yang bisa melihat semua user' };
    }
    return this.usersService.findAll();
  }

  /**
   * GET USER BY ID
   * GET /users/:id
   * hanya admin
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') {
      return { message: 'Forbidden: hanya admin yang bisa melihat user lain' };
    }
    return this.usersService.findOne(+id);
  }

  /**
   * UPDATE USER SENDIRI (opsional)
   * PATCH /users/me
   */
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateSelf(@Request() req, @Body() updateUserDto: any) {
    const id = req.user.id;
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * DELETE USER (admin only)
   * DELETE /users/:id
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== 'admin') {
      return { message: 'Forbidden: hanya admin yang bisa menghapus user' };
    }
    return this.usersService.remove(+id);
  }
}