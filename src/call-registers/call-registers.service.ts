import { Injectable } from '@nestjs/common';
import { CreateCallRegisterDto } from './dto/create-call-register.dto';
import { UpdateCallRegisterDto } from './dto/update-call-register.dto';

@Injectable()
export class CallRegistersService {
  create(createCallRegisterDto: CreateCallRegisterDto) {
    return 'This action adds a new callRegister';
  }

  findAll() {
    return `This action returns all callRegisters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} callRegister`;
  }

  update(id: number, updateCallRegisterDto: UpdateCallRegisterDto) {
    return `This action updates a #${id} callRegister`;
  }

  remove(id: number) {
    return `This action removes a #${id} callRegister`;
  }
}
