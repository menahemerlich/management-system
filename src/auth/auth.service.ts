import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth-dto';

const users: CreateAuthDto[] = []

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    async create(createAuthDto: CreateAuthDto) {
        const hash = await bcrypt.hash(createAuthDto.password, 10)
        createAuthDto.password = hash
        users.push(createAuthDto)
        return 'This action adds a new assignment';
    }

    async signIn(loginAuthDto:LoginAuthDto): Promise<{ access_token: string }> {
        const user = await this.findOneByName(loginAuthDto.name);
        if (typeof user === 'string') {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(loginAuthDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name, roles: user.role };
        const token = await this.jwtService.signAsync(payload)
        return {
            access_token: token
        };
    }


    findAll() {
        return users;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    async findOneByName(name: string) {
        for (const user of users) {
            if (user.name === name){
                return user
            }
        }
        return `User '${name}' not found`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
