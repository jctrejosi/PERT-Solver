from flask import Blueprint, jsonify, request
from .models import PERTCalculator
from .schemas import PERTRequest

bp = Blueprint('main', __name__)

@bp.route('/api/v1.0/calculatePert', methods=['POST'])
def calculate_pert():
    try:
        pert_request = PERTRequest(**request.json)
        pert_calculator = PERTCalculator(pert_request.activities, pert_request.expected_time)

        routes = pert_calculator.calculate_routes()
        table = pert_calculator.calculate_table()

        response = {
            'routes': routes,
            'table': table
        }

        return jsonify(response)
    except TypeError as e:
        return jsonify({'error': f'TypeError: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
