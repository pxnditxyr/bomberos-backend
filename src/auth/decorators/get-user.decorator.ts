import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common'

export const GetUser = createParamDecorator(
  ( data : string | string[], context : ExecutionContext ) => {
    const { user } = context.switchToHttp().getRequest()

    if ( !user )
      throw new InternalServerErrorException( 'User not found' )

    if ( typeof data === 'object' ) {
      const newUser = {}
      data.forEach( ( property : string ) => {
        newUser[ property ] = user[ property ]
      })
      return newUser
    }

    return data
      ? user[ data ]
      : user
  }
) 
