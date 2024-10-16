from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/api/execute-command', methods=['POST'])
def execute_command():
    # Get the command from the request body
    data = request.get_json()
    command = data.get('command')

    if not command:
        return jsonify({"message": "Command is required."}), 400

    try:
        # Run the command using subprocess, capturing stdout and stderr
        result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # If there is any error output, return it with a 500 status
        if result.stderr:
            return jsonify({"message": result.stderr}), 500

        # Return the standard output with a 200 status
        return jsonify({"message": result.stdout}), 200

    except Exception as e:
        # Return error message if the command execution fails
        return jsonify({"message": str(e)}), 500


if __name__ == '__main__':
    # Start the Flask app on port 5000, accessible externally
    app.run(host='0.0.0.0', port=5000)
