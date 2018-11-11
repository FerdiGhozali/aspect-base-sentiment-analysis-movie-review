from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
      try:
        text = request.get_data(as_text=True)
        print(text)
        #Predict disini, hasilnya masukin return
      except ValueError:
        return jsonify("Error")
    return jsonify(text)
        
if __name__ == '__main__':
    app.run(debug=True)