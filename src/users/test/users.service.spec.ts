import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from '../../roles/roles.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../model/user.model';
import { Role } from '../../roles/model/role.model';

describe('Users service', () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    destroy: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
  };
  const mockRolesRepository = {
    findOne: jest.fn().mockImplementation((value: string) => 'ADMIN'),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesRepository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  // describe('createUser', () => {
  //   describe('when createUser is called', () => {
  //     let createUserDto: CreateUserDto;
  //     let newUser: User;
  //     beforeAll(async () => {
  //       createUserDto = {
  //         name: userStub().name,
  //         email: userStub().email,
  //         password: userStub().password,
  //       };
  //       newUser = await usersService.createUser(createUserDto);
  //       console.log(newUser);
  //     });
  //     it('should create new user', async () => {
  //       expect(newUser).toMatchObject({
  //         ...userStub(),
  //         roles: ['ADMIN'],
  //       });
  //     });
  //   });
  // });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      test('then it should call userService', async () => {
        expect(await usersService.getOneUser(userStub().id)).toEqual(
          userStub(),
        );
      });
    });
  });
  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      test('then it should call userService', async () => {
        expect(await usersService.getAllUsers()).toEqual([userStub()]);
      });
    });
  });
  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      test('then it should call userService', async () => {
        expect(await usersService.deleteUser(userStub().id)).toEqual({
          message: "Foydalanuvchi o'chirildi",
        });
      });
    });
  });
});
