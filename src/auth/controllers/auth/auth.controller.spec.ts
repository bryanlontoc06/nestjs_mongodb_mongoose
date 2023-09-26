import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../services/auth/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;

  const jwtToken = 'jwtToken';

  const mockAuthService = {
    signUp: jest.fn().mockResolvedValueOnce(jwtToken),
    login: jest.fn().mockResolvedValueOnce(jwtToken),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  it('should be defind', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    const signUpDto = {
      name: 'Ghulam',
      email: 'ghulam@gmail.com',
      password: '12345678',
    };
    it('should register a new user', async () => {
      const result = await authController.signup(signUpDto);
      expect(authService.signUp).toHaveBeenCalled();
      expect(result).toEqual(jwtToken);
    });
  });

  describe('login', () => {
    const loginDto = {
      email: 'ghulam@gmail.com',
      password: '12345678',
    };
    it('should login a user', async () => {
      const result = await authController.login(loginDto);
      expect(authService.login).toHaveBeenCalled();
      expect(result).toEqual(jwtToken);
    });
  });
});
