import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const RawHeaders = createParamDecorator (
  ( _data, context : ExecutionContext ) => {
    const { rawHeaders } = context.switchToHttp().getRequest()
    if ( !rawHeaders )
      throw new InternalServerErrorException( 'User not found' )
    return rawHeaders
  }
)
