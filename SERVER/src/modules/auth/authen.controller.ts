import { AuthenService } from './authen.service';
import * as dotenv from 'dotenv';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { LoggingInterceptor } from 'src/shared/interceptor/logging.interceptor';
import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/authen.dto';
import { IResponseAuth } from './interface/authen.response';
import { AuthGuard } from '@nestjs/passport';

const init = process.env.API_URL;

@Controller(`${init}`)
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
export class AuthenController {
  constructor(private readonly authenService: AuthenService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto): Promise<any> {
    return await this.authenService.registerService(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto): Promise<IResponseAuth> {
    return await this.authenService.loginService(body);
  }
}
