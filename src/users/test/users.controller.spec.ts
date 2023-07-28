import { JwtService } from '@nestjs/jwt';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { User } from '../model/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');
describe('Users controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      //   imports:[AppModule]
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  it('should be defined usersController', () => {
    expect(usersController).toBeDefined();
  });
  it('should be defined usersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUsersDto: CreateUserDto;
      beforeAll(async () => {
        createUsersDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersController.createUser(createUsersDto);
        console.log(user);
      });
      it('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUsersDto);
      });
      it('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.getOneUser(userStub().id);
      });
      it('then it should call usersService', () => {
        expect(usersService.getOneUser).toBeCalledWith(userStub().id);
      });
      it('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      let users: User[];
      beforeEach(async () => {
        users = await usersController.getAllUsers();
      });
      test('then it should call usersService', () => {
        expect(usersService.getAllUsers).toBeCalled();
      });
      test('then it should return users', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let res: Object;
      beforeAll(async () => {
        res = await usersController.deleteUser(userStub().id.toString());
      });
      it('then it should call usersService', () => {
        expect(usersService.deleteUser).toBeCalledWith(userStub().id);
      });
      it('then it should return umessage', () => {
        expect(res).toEqual({ message: "Foydalanuvchi o'chirildi" });
      });
    });
  });
});
