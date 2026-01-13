import { Inject, Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth-dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    private jwtService: JwtService 
  ) {}
    async create(createAuthDto: CreateAuthDto) {
        const hash = await bcrypt.hash(createAuthDto.password, 10)
        createAuthDto.password = hash
        await this.userRepository.create({name: createAuthDto.name, email: createAuthDto.email, password: createAuthDto.password, role: createAuthDto.role})
        return 'This action adds a new assignment';
    }

    async signIn(loginAuthDto:LoginAuthDto): Promise<{ access_token: string }> {        
        const user = await this.findOneByName(loginAuthDto.name);
        
        if (typeof user === 'string') {
            throw new UnauthorizedException();
        }
        const userData = await user.toJSON();        
        const isMatch = await bcrypt.compare(loginAuthDto.password, userData.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }        
        const payload = { sub: userData.id, username: userData.name, role: userData.role };        
        const token = await this.jwtService.signAsync(payload)
        return {
            access_token: token
        };
    }

    
    async findAll() {
        const users =  await this.userRepository.findAll();
        return users
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    async findOneByName(name: string) {        
        const user = await this.userRepository.findOne({where: {name: name}})        
        if (user === null){
            return `User '${name}' not found`;
        }
        return user
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
