import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const signIn = await this.authService.signIn(signInDto);

    response.cookie('access_token', signIn.access_token, {
      httpOnly: true,
      secure: true,
    });
    response.cookie('refresh_token', signIn.refresh_token, {
      httpOnly: true,
      secure: true,
    });

    return {
      // name: signIn.name,
      // last_name: signIn.last_name,
      email: signIn.email,
      roles: signIn.roles,
      access_token: signIn.access_token,
    };
  }

  // FIXME: Delete the database refresh even if it has already expired.
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() request: Request, @Res() response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');

    await this.authService.logOut(request.cookies['refresh_token']);

    return response.json({
      message: 'Logged out successfully',
    });
  }

  @Post('refresh-token')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    const new_tokens = await this.authService.refreshToken(
      request.cookies['access_token'],
      request.cookies['refresh_token'],
      response,
    );

    response.cookie('access_token', new_tokens.new_access_token, {
      httpOnly: true,
      secure: true,
    });
    response.cookie('refresh_token', new_tokens.new_refresh_token, {
      httpOnly: true,
      secure: true,
    });

    return response.json({
      access_token: new_tokens.new_access_token,
    });
  }
}
