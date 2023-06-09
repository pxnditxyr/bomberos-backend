import { PartialType } from '@nestjs/mapped-types';
import { CreateCallRegisterDto } from './create-call-register.dto';

export class UpdateCallRegisterDto extends PartialType(CreateCallRegisterDto) {}
