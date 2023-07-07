from flask import Blueprint
from controllers.app_controller import index, create
from controllers.medico_controller import signup, login, getMedicoInfo
from controllers.paziente_controller import savePaziente, getAllPazienti, getPaziente, addBiopsia, addFollowup, getBiopsia, getFollowup

blueprint = Blueprint('blueprint', __name__)

blueprint.route('/', methods=['GET'])(index)
blueprint.route('/create', methods=['GET'])(create)

blueprint.route('/signup', methods=['POST'])(signup)
blueprint.route('/login', methods=['POST'])(login)
blueprint.route('/medico', methods=['POST'])(getMedicoInfo)

blueprint.route('/save_paziente', methods=['POST'])(savePaziente)
blueprint.route('/all_pazienti', methods=['POST'])(getAllPazienti)
blueprint.route('/paziente', methods=['POST'])(getPaziente)

blueprint.route('/add_biopsia', methods=['POST'])(addBiopsia)
blueprint.route('/add_followup', methods=['POST'])(addFollowup)
blueprint.route('/get_biopsia', methods=['POST'])(getBiopsia)
blueprint.route('/get_followup', methods=['POST'])(getFollowup)