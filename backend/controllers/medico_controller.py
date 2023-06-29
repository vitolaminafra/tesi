from services.medico_service import signup_logic, login_logic, getMedicoInfo_logic

def signup():
    return signup_logic()
    
def login():
    return login_logic()

def getMedicoInfo():
    return getMedicoInfo_logic()