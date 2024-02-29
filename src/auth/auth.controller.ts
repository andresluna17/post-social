import { AuthService } from './auth.service';
import { Tokens } from './../types/tokens.type';

import {
  Body,
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthDto } from 'src/shared/dto/auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { GetCurrentUserId } from 'src/shared/decorators/get-current-user-id.decorator';
import { RefreshTokenGuard } from './guards/refesh-token.guard';
import { GetCurrentUser } from 'src/shared/decorators/get-current-user.decorator';

@Controller({
  path: 'auth',
  version: '1.0.2',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateUserDto): Promise<Tokens> {
    return await this.authService.register(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: number) {
    return await this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetCurrentUser('refreshToken') refreshToken: string,
    @GetCurrentUserId() userId: number,
  ) {
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
