import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async create(user_id: number, status: string) {
    return this.prisma.attendance.create({
      data: {
        user_id,
        status,
        date: new Date(),
        time: new Date().toLocaleTimeString(),
      },
    });
  }

  async findAll() {
    return this.prisma.attendance.findMany({
      include: { user: true },
      orderBy: { date: 'desc' },
    });
  }

  async findMine(user_id: number) {
    return this.prisma.attendance.findMany({
      where: { user_id },
      orderBy: { date: 'desc' },
    });
  }

  async findToday(user_id: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return this.prisma.attendance.findMany({
      where: {
        user_id,
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
  }

  async updateStatus(id: number, status: string, userRole: string) {
    if (userRole !== 'admin') {
      throw new ForbiddenException('Only admin can update attendance');
    }

    return this.prisma.attendance.update({
      where: { id },
      data: { status },
    });
  }

  async getMonthlyReport(month: number, year: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const attendances = await this.prisma.attendance.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
      },
      include: { user: true },
      orderBy: { user_id: 'asc' },
    });

    return attendances;
  }
}