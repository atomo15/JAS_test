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

    sql = "SELECT `Province`,COUNT(*) as ACCOUNTs  From Services Group by `Province` ORDER by ACCOUNTS DESC;"
    mycursor.execute(sql)
    myresult2 = mycursor.fetchall()

    # for x in myresult:
    #     print(x)
    
    #print(type(myresult))

    return render_template("home.html",data=myresult,test=myresult2);

@app.route('/InterneTypeByZone', methods=['GET'])
def internetTBZone():
    #sql = "SELECT `Zone`,COUNT(*) as ACCOUNTs  From Services Group by `Zone` ORDER by `Zone`;"
    sql = 'SELECT ZONE, COUNT(*) as ACCOUNTs From Services WHERE InternetType LIKE "Fiber optic" GROUP BY `Zone` ORDER BY `Zone` ;'
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    
    sql = 'SELECT ZONE, COUNT(*) as ACCOUNTs From Services WHERE InternetType LIKE "DSL" GROUP BY `Zone` ORDER BY `Zone` ;'
    mycursor.execute(sql)
    myresult2 = mycursor.fetchall()

    return render_template("zone/InternetTypeByZone_page.html",data=myresult,test=myresult2);

@app.route('/StreamingTVByZone', methods=['GET'])
def StreamingTVByZone():
    sql = 'SELECT ZONE, COUNT(*) as ACCOUNTs From Services WHERE StreamingTV LIKE "Yes" GROUP BY `Zone` ORDER BY `Zone` ;'
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    
    sql = 'SELECT ZONE, COUNT(*) as ACCOUNTs From Services WHERE StreamingTV LIKE "No" GROUP BY `Zone` ORDER BY `Zone` ;'
    mycursor.execute(sql)
    myresult2 = mycursor.fetchall()

    return render_template("zone/StreamingTVByZone_page.html",data=myresult,test=myresult2);

@app.route('/FaultPowerOutagePerMonthByZone', methods=['GET'])
def FaultPowerOutagePerMonthByZone():
    sql = 'SELECT ZONE, SUM(FaultPowerOutagePerMonth) as CNT From Services GROUP BY `Zone` ORDER BY `Zone` ; '
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    
    sql = 'SELECT SUM(FaultPowerOutagePerMonth) as CNT From Services ;'
    mycursor.execute(sql)
    myresult2 = mycursor.fetchall()

    return render_template("zone/FaultPowerOutagePerMonth_page.html",data=myresult,test=myresult2);

@app.route('/FaultCableCutPerMonthByZone', methods=['GET'])
def FaultCableCutPerMonthByZone():
    sql = 'SELECT ZONE, SUM(FaultCableCutPerMonth) as CNT From Services GROUP BY `Zone` ORDER BY `Zone` ; '
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    
    sql = 'SELECT SUM(FaultCableCutPerMonth) as CNT From Services ;'
    mycursor.execute(sql)
    myresult2 = mycursor.fetchall()

    return render_template("zone/FaultCableCutPerMonth_page.html",data=myresult,test=myresult2);

@app.route('/InterneTypeByProvince', methods=['GET'])
def internetTBProvince():
    sql = 'SELECT `Province`,COUNT(*) as ACCOUNTs  From Services WHERE InternetType LIKE "Fiber optic"  Group by `Province` ORDER by ACCOUNTs DESC  LIMIT 10 ;'
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    
    sql = 'SELECT `Province`,COUNT(*) as ACCOUNTs  From Services WHERE InternetType LIKE "DSL"  Group by `Province` ORDER by ACCOUNTs DESC LIMIT 10 ;'
    mycursor.execute(sql)
    myresult2 = mycursor.fetchall()

    sql = 'SELECT COUNT(*) as ACCOUNTs  From Services WHERE InternetType LIKE "DSL";'
    mycursor.execute(sql)
    total_dsl = mycursor.fetchall()

    sql = 'SELECT COUNT(*) as ACCOUNTs  From Services WHERE InternetType LIKE "Fiber optic";'
    mycursor.execute(sql)
    total_fiber = mycursor.fetchall()

    return render_template("province/InternetTypeByProvince_page.html",data=myresult,test=myresult2,total_dsl=total_dsl,total_fiber=total_fiber);

if __name__ == '__main__':
    app.run(debug=True)