from banco import Banco
bd = Banco()


class Rotina:

    def __init__(self,experiencia, objetivo, days, foco, cardio):
        self.experiencia = experiencia
        self.objetivo = objetivo
        self.days = days
        self.foco = foco
        self.cardio = cardio

    def create_rotina(self):
        semana = {
    'Se': {
        "exAtivo": [
            {"idExercicio": 1, "nome": "Supino Reto na Barra"},
            {"idExercicio": 2, "nome": "Supino Inclinado com Barra"}, 
            {"idExercicio": 21, "nome": "Extensão de Tríceps na Polia Alta"},
            {"idExercicio": 24, "nome": "Extensão de Tríceps na Máquina"}
        ],
        "serie": [
            {"idSerie": 1, "numSerie": 1, "idEx": 1, "reps": 10, "kg": 80},
            {"idSerie": 2, "numSerie": 2, "idEx": 1, "reps": 10, "kg": 80},
            {"idSerie": 3, "numSerie": 3, "idEx": 1, "reps": 8, "kg": 85},
            {"idSerie": 4, "numSerie": 1, "idEx": 2, "reps": 10, "kg": 75},
            {"idSerie": 5, "numSerie": 2, "idEx": 2, "reps": 8, "kg": 80},
            {"idSerie": 6, "numSerie": 3, "idEx": 2, "reps": 6, "kg": 85},
            {"idSerie": 7, "numSerie": 1, "idEx": 21, "reps": 12, "kg": 60},
            {"idSerie": 8, "numSerie": 2, "idEx": 21, "reps": 10, "kg": 65},
            {"idSerie": 9, "numSerie": 3, "idEx": 21, "reps": 8, "kg": 70},
            {"idSerie": 10, "numSerie": 1, "idEx": 24, "reps": 12, "kg": 50},
            {"idSerie": 11, "numSerie": 2, "idEx": 24, "reps": 10, "kg": 55},
            {"idSerie": 12, "numSerie": 3, "idEx": 24, "reps": 8, "kg": 60}
        ]
    },
    'Qa': {
        "exAtivo": [
            {"idExercicio": 33, "nome": "Agachamento Livre com Barra"},
            {"idExercicio": 34, "nome": "Leg Press 45°"},
            {"idExercicio": 35, "nome": "Cadeira Extensora"},
            {"idExercicio": 39, "nome": "Cadeira Flexora"}
        ],
        "serie": [
            {"idSerie": 13, "numSerie": 1, "idEx": 33, "reps": 12, "kg": 80},
            {"idSerie": 14, "numSerie": 2, "idEx": 33, "reps": 10, "kg": 90},
            {"idSerie": 15, "numSerie": 3, "idEx": 33, "reps": 8, "kg": 100},
            {"idSerie": 16, "numSerie": 1, "idEx": 34, "reps": 15, "kg": 200},
            {"idSerie": 17, "numSerie": 2, "idEx": 34, "reps": 12, "kg": 230},
            {"idSerie": 18, "numSerie": 3, "idEx": 34, "reps": 10, "kg": 250},
            {"idSerie": 19, "numSerie": 1, "idEx": 35, "reps": 12, "kg": 60},
            {"idSerie": 20, "numSerie": 2, "idEx": 35, "reps": 10, "kg": 65},
            {"idSerie": 21, "numSerie": 3, "idEx": 35, "reps": 8, "kg": 70},
            {"idSerie": 22, "numSerie": 1, "idEx": 39, "reps": 12, "kg": 45},
            {"idSerie": 23, "numSerie": 2, "idEx": 39, "reps": 10, "kg": 50},
            {"idSerie": 24, "numSerie": 3, "idEx": 39, "reps": 8, "kg": 55}
        ]
    },
    'Sex': {
        "exAtivo": [
            {"idExercicio": 8, "nome": "Puxada na Frente na Polia Alta"},
            {"idExercicio": 11, "nome": "Remada Curvada na Barra"},
            {"idExercicio": 15, "nome": "Rosca Direta na Barra W"},
            {"idExercicio": 17, "nome": "Rosca Martelo em Pé"}
        ],
        "serie": [
            {"idSerie": 25, "numSerie": 1, "idEx": 8, "reps": 10, "kg": 70},
            {"idSerie": 26, "numSerie": 2, "idEx": 8, "reps": 10, "kg": 70},
            {"idSerie": 27, "numSerie": 3, "idEx": 8, "reps": 8, "kg": 75},
            {"idSerie": 28, "numSerie": 1, "idEx": 11, "reps": 10, "kg": 80},
            {"idSerie": 29, "numSerie": 2, "idEx": 11, "reps": 10, "kg": 80},
            {"idSerie": 30, "numSerie": 3, "idEx": 11, "reps": 8, "kg": 85},
            {"idSerie": 31, "numSerie": 1, "idEx": 15, "reps": 10, "kg": 40},
            {"idSerie": 32, "numSerie": 2, "idEx": 15, "reps": 10, "kg": 40},
            {"idSerie": 33, "numSerie": 3, "idEx": 15, "reps": 8, "kg": 45},
            {"idSerie": 34, "numSerie": 1, "idEx": 17, "reps": 10, "kg": 30},
            {"idSerie": 35, "numSerie": 2, "idEx": 17, "reps": 10, "kg": 30},
            {"idSerie": 36, "numSerie": 3, "idEx": 17, "reps": 8, "kg": 35}
        ]
    }
}

       
        return semana

      #    const [days, setDays] = useState({'Do':false, 'Se':false, 'Te':false, 'Qa':false, 'Qi':false, 'Sex':false, 'Sa':false})


