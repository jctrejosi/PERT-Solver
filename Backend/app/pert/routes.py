from flask import Blueprint, jsonify, request
from .models import PERTCalculator, Activity

bp = Blueprint('main', __name__)

@bp.route('/api/v1.0/calculatePert', methods=['POST'])
def calculate_pert_route():
    try:
        data = request.json
        activities_data = data.get('activities', [])
        expected_time = data.get('expected_time', 0)

        # Crear instancias de Activity a partir de los datos recibidos
        activities = [Activity(**act) for act in activities_data]

        # Calcular los tiempos PERT
        pert_calculator = PERTCalculator(activities, expected_time)
        pert_calculator.calculate_pert()

        # Calcular la tabla y las rutas
        routes = pert_calculator.routes_with_times
        activity_times = pert_calculator.get_activity_times()
        table = Activity.calculate_table(activities)
        probability = pert_calculator.calculate_completion_probability()
        critical_path = pert_calculator.critical_path

        # Calcular optimización de la ruta crítica
        optimization_result = pert_calculator.optimize_critical_path()

        response = {
            'routes': routes,
            'table': table,
            'activity_times': activity_times,
            'probability': probability,
            'optimized_activities': optimization_result,
            'critical_path': critical_path
        }

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
