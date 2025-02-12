from flask import Blueprint, jsonify, request
import pandas as pd
from .models import Activity, PERTCalculator

bp = Blueprint('main', __name__)

@bp.route('/api/v1.0/calculatePert', methods=['POST'])
def calculate_pert():
    try:
        data = request.json
        activities = data['activities']

        pert_calculator = PERTCalculator(activities)

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
