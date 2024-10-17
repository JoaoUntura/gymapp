import mysql.connector

class Banco():
    def __init__(self):
        self.db = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="221203",
            database="exercises"
        )
        if self.db.is_connected():
            self.cursor = self.db.cursor(dictionary=True)
        else:
            print("Erro na conexão com o banco de dados")
    
        
    def select_ex(self):
        self.cursor.execute("SELECT exercicio.idExercicio, exercicio.nome, exercicio.image, nome_muscle, image FROM exercicio INNER JOIN muscle on exercicio.muscle_idMuscle =  muscle.idMuscle ")
        return self.cursor.fetchall()
    
    def select_treinos(self,id):
        self.cursor.execute("SELECT *  from treinamento where idUser_treinamento = %s", (id,))
        return self.cursor.fetchall()
    
    def select_series(self,id):
        self.cursor.execute("SELECT idTreinamento_serie,nome,reps,kg FROM series join exercicio on idExercicio_serie = idExercicio where idTreinamento_serie = %s ", (id,))
        return self.cursor.fetchall()

    def insert_treinamento(self,id):
        self.cursor.execute("INSERT INTO treinamento(idUser_treinamento) VALUES(%s)", (id,))
        self.db.commit()

    def last_treinamento(self):
         self.cursor.execute("SELECT idTreinamento FROM treinamento ORDER BY idTreinamento DESC LIMIT 1")
         return self.cursor.fetchall()[0]
    
    def insert_serie(self, idTreinamento, idExercicio,reps,kg):
        self.cursor.execute("INSERT INTO series(idTreinamento_serie,idExercicio_serie,reps,kg) VALUES(%s,%s,%s,%s)", (idTreinamento,idExercicio,reps,kg))
        self.db.commit()

    def insert_user(self,nome,senha_hash):
        self.cursor.execute("INSERT INTO user(username,senha) VALUES(%s,%s)",(nome,senha_hash))
        self.db.commit()

    def check_user(self,nome):
        self.cursor.execute("SELECT *  FROM user where username = %s", (nome,))
        return self.cursor.fetchall()[0]
    