from fastapi import FastAPI, APIRouter, Depends, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from pydantic import BaseModel
from starlette.middleware.sessions import SessionMiddleware
from banco import Banco
from Auth import Auth
from rotina import Rotina
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from typing import List
from passlib.hash import bcrypt
import json

bd = Banco()
app = FastAPI()
auth = Auth()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
origins = [
    "http://localhost:3000",  # Adicione a origem do seu aplicativo, se necessário
    "http://127.0.0.1:3000",
    "http://192.168.3.11:8000",
    "http://192.168.3.3:8000",  # Ex: http://192.168.1.x:8000
    "*",  # Permite todas as origens (não recomendado para produção)
]
# Configurações de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Substitua pela URL do seu frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)


class Treinamento(BaseModel):
    serie:List[dict]
    volume:int


class User(BaseModel):
    nome:str
    senha:str

class Questionario(BaseModel):
    experiencia:str
    objetivo:str
    days:dict
    foco:str
    cardio:str

@app.on_event("startup")
async def startup():
    await bd.connect()

@app.on_event("shutdown")
async def shutdown():
    await bd.disconnect()

@app.get("/exercicios")
async def muscles(request: Request):
    ex = await bd.select_ex()
    
    return ex


@app.get("/treinamentos")
async def treinamentos(token: str = Depends(oauth2_scheme)):
    userid = auth.verify_token(token)
    treinos = await bd.select_treinos(userid)
    
    idTreinos = []
    for treino in treinos:
        idTreinos.append(treino['idTreinamento'])

    return idTreinos


@app.delete("/deltreinamento/{id}")
async def del_treinamento(id:int):
    await bd.del_treinamento(id)

    return "ok"

@app.get("/series/{id}")
async def series_id(id:int):
    series = await bd.select_series(int(id))
    exs = {}
    serie_counter = 1
    for serie in series:
        if serie['nome'] not in exs.keys():
            serie_counter = 1
            exs[serie['nome']] = [{'numSerie':serie_counter, 'reps':serie['reps'], 'kg': serie['kg']}]
        else:
            exs[serie['nome']].append({'numSerie':serie_counter+1,'reps':serie['reps'], 'kg': serie['kg']})
        
    return exs



@app.post("/novo_treinamento")
async def novo_treinamento(treinamento:Treinamento , token: str = Depends(oauth2_scheme)):
    userid = auth.verify_token(token)
    await bd.insert_treinamento(userid, treinamento.volume)
    
    treino_id = await bd.last_treinamento()

    for s in treinamento.serie:
        await bd.insert_serie(treino_id['idTreinamento'],s['idEx'], s['reps'], s['kg'])


    return "ok"


@app.post("/novo_user")
async def novo_user(user: User):
    
    hashed = bcrypt.hash(user.senha)
    await bd.insert_user(user.nome, hashed)

    return "ok"


@app.post("/check_user")
async def check_user(user: User):
    
    verificacao = await auth.check(user.nome,user.senha)

    if verificacao:
        token = auth.create_jwt_token(verificacao['idUser'])
        username = verificacao['username']
        return {"token":token, "message":"Login bem suscedido!", "username":username}
    
    else:
        return {"token":False,"message": "Erro de login"}


"""
class Questionario(BaseModel):
    experiencia:str
    objetivo:str
    days:dict
    foco:str
    cardio:str

"""

    
@app.post("/new_rotina")
async def new_rotina(quest:Questionario, token: str = Depends(oauth2_scheme)):
    userid = auth.verify_token(token)
    dias =  json.dumps(quest.days)
    print(dias)
    await bd.insert_rotina(userid, quest.experiencia, quest.objetivo, dias,quest.foco, quest.cardio)
    
    return "ok"


@app.get("/get_rotina")
async def get_rotina(request:Request, token: str = Depends(oauth2_scheme)):
    userid = auth.verify_token(token)
    data = await bd.select_rotina(userid)
    rotina = Rotina(data['experiencia'], data['objetivo'], data['days'], data['foco'], data['cardio'])
    myrotina = rotina.create_rotina()

    return {"myrotina":myrotina}



