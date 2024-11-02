import jwt
from passlib.hash import bcrypt
from banco import Banco
SECRET_KEY = "chave_secreta"
ALGORITHM = "HS256"  


class Auth:
    def __init__(self):
     self.bd = Banco()

        
    def verify_token(self, token):
    
        # Decodifica o token JWT com a chave secreta e algoritmo
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")

        return user_id

    async def check(self,nome,senha):
        await self.bd.connect()

        try:
            usuario = await self.bd.check_user(nome)
            
            
        except Exception as e:
            print(e)
            return False
        

        if bcrypt.verify(senha, usuario['senha']):
            return usuario
            
        
        else:
            return False
            
    
    def create_jwt_token(self,id):
        token = jwt.encode({"sub": id}, SECRET_KEY, algorithm=ALGORITHM)
        return token
