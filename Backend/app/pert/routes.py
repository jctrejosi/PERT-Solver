from flask import Blueprint, jsonify, request
import pandas as pd

bp = Blueprint('main', __name__)

@bp.route('/api/v1.0/calculatePert', methods=['POST'])
def calculate_pert():
    data = request.json
    df = pd.DataFrame(data)
    return jsonify(df.to_dict(orient='records'))
