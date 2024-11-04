from databases import Database

class Banco:
    def __init__(self):
        self.database = Database("mysql://root:221203@localhost/exercises")

    async def connect(self):
        await self.database.connect()

    async def disconnect(self):
        await self.database.disconnect()

    async def select_ex(self):
        query = "SELECT exercicio.idExercicio, exercicio.nome, exercicio.image, nome_muscle, image FROM exercicio INNER JOIN muscle ON exercicio.muscle_idMuscle = muscle.idMuscle"
        return await self.database.fetch_all(query)

    async def select_treinos(self, id):
        query = "SELECT * FROM treinamento WHERE idUser_treinamento = :id"
        return await self.database.fetch_all(query, values={"id": id})

    async def select_series(self, id):
        query = "SELECT idTreinamento_serie, nome, reps, kg FROM series JOIN exercicio ON idExercicio_serie = idExercicio WHERE idTreinamento_serie = :id"
        return await self.database.fetch_all(query, values={"id": id})
    
    async def select_best_volume(self, idEx, userid):
        try:
            query = "SELECT reps, kg FROM series WHERE idExercicio_serie = :idEx AND userid = :userid ORDER BY (reps * kg) DESC LIMIT 1"
            return await self.database.fetch_one(query, values={"idEx": idEx, "userid":userid})
        except Exception as e:
            return False
    
    async def select_best_kg(self, idEx, userid):
        try:
            query = "SELECT kg FROM series join treinamento on idTreinamento_serie = idTreinamento  WHERE idExercicio_serie = :idEx AND userid = :userid ORDER BY kg DESC LIMIT 1"
            return await self.database.fetch_one(query, values={"idEx": idEx, "userid":userid})
        except Exception as e:
            return False
    
    async def select_best_byday(self, idEx, userid):
        try:
            query = "SELECT data_treinamento as x, MAX(kg) as y FROM series join treinamento on idTreinamento_serie = idTreinamento  WHERE idExercicio_serie = :idEx AND userid = :userid GROUP BY data_treinamento ORDER BY y ;"
            return await self.database.fetch_all(query, values={"idEx": idEx, "userid":userid})
        except Exception as e:
            return False
    
    async def select_series_by_muscle(self, id):
        query = "select idSerie, reps, kg, nome_muscle from series join exercicio on idExercicio_serie = idExercicio join muscle on muscle_idMuscle = idMuscle WHERE userid = :id"
        return await self.database.fetch_all(query, values={"id": id})

    async def insert_treinamento(self, id, volume, data):
        query = "INSERT INTO treinamento(idUser_treinamento, volume, data_treinamento) VALUES(:id, :volume, :data)"
        await self.database.execute(query, values={"id": id, "volume":volume, "data": data})

    async def last_treinamento(self):
        query = "SELECT idTreinamento FROM treinamento ORDER BY idTreinamento DESC LIMIT 1"
        return await self.database.fetch_one(query)

    async def insert_serie(self, idTreinamento, idExercicio, reps, kg, userid):
        query = "INSERT INTO series(idTreinamento_serie, idExercicio_serie, reps, kg, userid) VALUES(:idTreinamento, :idExercicio, :reps, :kg, :userid)"
        await self.database.execute(query, values={"idTreinamento": idTreinamento, "idExercicio": idExercicio, "reps": reps, "kg": kg, "userid":userid})

    async def insert_user(self, nome, senha_hash):
        query = "INSERT INTO user(username, senha) VALUES(:nome, :senha_hash)"
        await self.database.execute(query, values={"nome": nome, "senha_hash": senha_hash})

    async def check_user(self, nome):
        print(nome)
        query = "SELECT * FROM user WHERE username = :nome"
        return await self.database.fetch_one(query, values={"nome": nome})

    async def del_treinamento(self, id):
        query = "DELETE FROM treinamento WHERE idTreinamento = :id"
        await self.database.execute(query, values={"id": id})

    async def insert_rotina(self,userid,experiencia, objetivo, days, foco, cardio):
        query = "INSERT INTO rotina (userid, experiencia, objetivo, days, foco, cardio) VALUES(:userid,:experiencia, :objetivo, :days, :foco, :cardio)"
        await self.database.execute(query, values={"userid": userid, "experiencia":experiencia, "objetivo":objetivo, "days":days, "foco":foco, "cardio":cardio })
