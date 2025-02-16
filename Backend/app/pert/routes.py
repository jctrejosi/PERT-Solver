from flask import Blueprint, jsonify, request
from .models import PERTCalculator, Activity

bp = Blueprint('main', __name__)

@bp.route('/api/v1.0/calculatePert', methods=['POST'])
def calculate_pert_route():
    try:
        data = request.json
        activities_data = data.get('activities', [])
        # Crear instancias de Activity a partir de los datos recibidos
        activities = [Activity(**act) for act in activities_data]
#        expected_time = data.get('expected_time', 0)

        # Calcular los tiempos PERT
#        pert_calculator = PERTCalculator(activities, expected_time)
#        pert_calculator.calculate_pert()

#        routes = pert_calculator.calculate_routes()
        table = Activity.calculate_table(activities)

        response = {
            'routes': [],
            'table': table
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
