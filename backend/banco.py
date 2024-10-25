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

    async def insert_treinamento(self, id, volume):
        query = "INSERT INTO treinamento(idUser_treinamento, volume) VALUES(:id, :volume)"
        await self.database.execute(query, values={"id": id, "volume":volume})

    async def last_treinamento(self):
        query = "SELECT idTreinamento FROM treinamento ORDER BY idTreinamento DESC LIMIT 1"
        return await self.database.fetch_one(query)

    async def insert_serie(self, idTreinamento, idExercicio, reps, kg):
        query = "INSERT INTO series(idTreinamento_serie, idExercicio_serie, reps, kg) VALUES(:idTreinamento, :idExercicio, :reps, :kg)"
        await self.database.execute(query, values={"idTreinamento": idTreinamento, "idExercicio": idExercicio, "reps": reps, "kg": kg})

    async def insert_user(self, nome, senha_hash):
        query = "INSERT INTO user(username, senha) VALUES(:nome, :senha_hash)"
        await self.database.execute(query, values={"nome": nome, "senha_hash": senha_hash})

    async def check_user(self, nome):
        query = "SELECT * FROM user WHERE username = :nome"
        return await self.database.fetch_one(query, values={"nome": nome})

    async def del_treinamento(self, id):
        query = "DELETE FROM treinamento WHERE idTreinamento = :id"
        await self.database.execute(query, values={"id": id})