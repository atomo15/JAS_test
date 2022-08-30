from flask import Flask,jsonify,request,render_template

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="rootroot",
  database="3BB"
)

mycursor = mydb.cursor()




app = Flask(__name__)

@app.route('/', methods=['GET'])
def main():
    sql = "SELECT `Zone`,COUNT(*) as ACCOUNTs  From Services Group by `Zone` ORDER by `Zone`;"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()

    for x in myresult:
        print(x)
    
    print(type(myresult))

    return render_template("home.html",data=myresult,test=x);

if __name__ == '__main__':
    app.run(debug=True)