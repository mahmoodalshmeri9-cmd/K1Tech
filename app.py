import os
from flask import Flask, render_value, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
db_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Model for 3D Scenes
class Scene(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    data = db.Column(db.Text, nullable=False)  # Storing serialized JSON string of the scene
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'data': self.data,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# Create the database tables
with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/scenes', methods=['GET'])
def get_scenes():
    try:
        scenes = Scene.query.order_by(Scene.created_at.desc()).all()
        return jsonify([scene.to_dict() for scene in tweaks_or_scenes(scenes)])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def tweaks_or_scenes(scenes):
    return scenes

@app.route('/api/scenes', methods=['POST'])
def save_scene():
    try:
        payload = request.json
        name = payload.get('name', 'Unnamed Scene')
        data = payload.get('data')

        if not data:
            return jsonify({'error': 'Data field is required'}), 400

        # Check if we should update an existing scene or create a new one
        scene_id = payload.get('id')
        if scene_id:
            scene = Scene.query.get(scene_id)
            if scene:
                scene.name = name
                scene.data = data
                db.session.commit()
                return jsonify({'message': 'Scene updated successfully', 'scene': scene.to_dict()}), 200

        new_scene = Scene(name=name, data=data)
        db.session.add(new_scene)
        db.session.commit()
        return jsonify({'message': 'Scene created successfully', 'scene': new_scene.to_dict()}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/scenes/<int:scene_id>', methods=['GET'])
def get_scene(scene_id):
    try:
        scene = Scene.query.get(scene_id)
        if not scene:
            return jsonify({'error': 'Scene not found'}), 404
        return jsonify(scene.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/scenes/<int:scene_id>', methods=['DELETE'])
def delete_scene(scene_id):
    try:
        scene = Scene.query.get(scene_id)
        if not scene:
            return jsonify({'error': 'Scene not found'}), 404
        db.session.delete(scene)
        db.session.commit()
        return jsonify({'message': 'Scene deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Ensure templates folder exists
    os.makedirs('templates', exist_ok=True)
    app.run(debug=True, port=5000)
