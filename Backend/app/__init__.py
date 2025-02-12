from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'your_secret_key'

    with app.app_context():
        from .pert import routes as pert_routes
        app.register_blueprint(pert_routes.bp)

    return app
