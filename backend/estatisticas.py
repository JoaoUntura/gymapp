from banco import Banco

bd = Banco()


class Stats:
    def __init__(self, userid):
        self.userid = userid
    
    async def get(self):
        await bd.connect()
        
        series = await bd.select_series_by_muscle(self.userid)

        musculo = {"Peitoral":0, "Costas":0,  "Bíceps":0, "Tríceps":0, "Deltóide":0, "Quadríceps":0 , "Posterior":0, "Panturrilha":0,"Glúteos":0,"Trapézio":0,"Abdômen":0}
        total = 0
        for serie in series:
           if float(serie['reps']) > 0 and float(serie['kg'] > 0):
                total += float(serie['reps']) * float(serie['kg'])
                musculo[serie['nome_muscle']] += float(serie['reps']) * float(serie['kg'])


        musculo_porcentagem = musculo.copy()
        musculo_color = musculo.copy()
        
        for key, value in musculo_porcentagem.items():
            porcentagem = round((value * 100) / total, 1) 
            musculo_porcentagem[key] = porcentagem
            if porcentagem == 0:
                musculo_color[key] = "#FFFFFF"
            
            elif 0 < porcentagem <= 10:
                musculo_color[key] = "#78a2f5"

            elif 10 < porcentagem <= 20:
                musculo_color[key] = "#0a1df2"

            elif 20 < porcentagem <= 30:
                musculo_color[key] = "#f2b80a"
            
            elif 30 < porcentagem <= 40:
                musculo_color[key] = "#f25f0a"

            elif 40 < porcentagem <= 50:
                musculo_color[key] = "#fc0303"

            else:
                musculo_color[key] = "#b603fc"

        print(musculo_porcentagem)
        return musculo_porcentagem, musculo, musculo_color
       

    async def get_progessao(self, idExercicio):
        await bd.connect()
        series = await bd.select_best_byday(idExercicio,  self.userid)
        return series
        

