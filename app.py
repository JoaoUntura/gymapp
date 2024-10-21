from fastapi import FastAPI, APIRouter, Depends, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware
from banco import Banco
from fastapi.middleware.cors import CORSMiddleware
from passlib.hash import bcrypt
import jwt
import datetime
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer


bd = Banco()

app = FastAPI()
SECRET_KEY = "chave_secreta"
ALGORITHM = "HS256"  
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Configurações de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Substitua pela URL do seu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)


class Treinamento(BaseModel):
    serie:list


class User(BaseModel):
    nome:str
    senha:str


@app.get("/exercicios")
async def muscles(request: Request):
    ex = bd.select_ex()
    
    return ex


@app.get("/treinamentos")
async def treinamentos(token: str = Depends(oauth2_scheme)):
    userid = verify_token(token)
    treinos = bd.select_treinos(userid)
    
    idTreinos = []
    for treino in treinos:
        idTreinos.append(treino['idTreinamento'])

    return idTreinos


@app.get("/series/{id}")
async def treinamentos(id:int):
    series = bd.select_series(int(id))
    exs = {}
    serie_counter = 1
    for serie in series:
        if serie['nome'] not in exs.keys():
            serie_counter = 1
            exs[serie['nome']] = [{'numSerie':serie_counter, 'reps':serie['reps'], 'kg': serie['kg']}]
        else:
            exs[serie['nome']].append({'numSerie':serie_counter+1,'reps':serie['reps'], 'kg': serie['kg']})
        
    return exs


def verify_token(token: str):
  
    # Decodifica o token JWT com a chave secreta e algoritmo
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    user_id = payload.get("sub")

    return user_id


@app.post("/novo_treinamento")
async def treinamento(treinamento:Treinamento , token: str = Depends(oauth2_scheme)):
    userid = verify_token(token)
    bd.insert_treinamento(userid)
    treino_id = bd.last_treinamento()['idTreinamento']

    for s in treinamento.serie:
        bd.insert_serie(treino_id,s['idEx'], s['reps'], s['kg'])


    return "ok"


@app.post("/novo_user")
async def novo_user(user: User):
    
    hashed = bcrypt.hash(user.senha)
    bd.insert_user(user.nome, hashed)

    return "ok"


def check(nome,senha):

    try:
        usuario = bd.check_user(nome)
        
    except Exception as e:
        
        return False
    

    if bcrypt.verify(senha, usuario['senha']):
        return usuario
    
    else:
        return False



def create_jwt_token(id: int):
    token = jwt.encode({"sub": id}, SECRET_KEY, algorithm=ALGORITHM)
    return token


@app.post("/check_user")
async def check_user(user: User):
    
    verificacao = check(user.nome,user.senha)

    if verificacao:
        token = create_jwt_token(verificacao['idUser'])
        username = verificacao['username']
        return {"token":token, "message":"Login bem suscedido!", "username":username}
    
    else:
        return {"token":False,"message": "Erro de login"}
     
    
   


