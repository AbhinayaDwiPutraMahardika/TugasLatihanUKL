import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body('status') status: string) {
    const user = req.user;
    return this.attendanceService.create(user.id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll(@Request() req) {
    if (req.user.role !== 'admin') {
      return { message: 'Forbidden: Only admin can access all records' };
    }
    return this.attendanceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMine(@Request() req) {
    return this.attendanceService.findMine(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('today')
  async findToday(@Request() req) {
    return this.attendanceService.findToday(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.attendanceService.updateStatus(
      Number(id),
      status,
      req.user.role,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('rekap')
  async getMonthlyReport(
    @Request() req,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    if (req.user.role !== 'admin') {
      return { message: 'Forbidden: Only admin can view report' };
    }
    return this.attendanceService.getMonthlyReport(+month, +year);
  }
}