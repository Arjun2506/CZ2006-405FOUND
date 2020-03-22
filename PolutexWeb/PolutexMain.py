import os

from flask import Flask, render_template, request
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from createPolutexDB import *
from sqlalchemy import and_, or_



app = Flask(__name__)

db_string = 'postgres+psycopg2://postgres:danielking17post29@localhost:1234/Polutex'
engine = create_engine(db_string)

db = scoped_session(sessionmaker(bind=engine))

def loginCheck(userName, password):
    un = db.query(userDB).get(userName)
    if ( None == un ):
        print("Invalid UserName ")
        return (False, 1)
    if( password != un.Password):
        print("Invalid Password ")
        return (False, 2)
    return (True, 3)

def searchOutput(book_id, title, author):
    x = "Choose an Option"
    if(book_id == "Choose an Option" and author != x and title != x):
        print(1)
        q = db.query(booksdb).filter(and_(booksdb.title == title, booksdb.author == author)).all()

    elif(title == "Choose an Option" and book_id != x and author != x):
        print(2)
        q = db.query(booksdb).filter(and_(booksdb.isbn == book_id, booksdb.author == author)).all()

    elif(author == "Choose an Option" and book_id != x and title != x):
        print(3)
        q = db.query(booksdb).filter(and_(booksdb.isbn == book_id, booksdb.title == title)).all()

    elif(book_id == "Choose an Option" and title == "Choose an Option" and author != x):
        print(4)
        q = db.query(booksdb).filter(booksdb.author == author).all()

    elif(author == "Choose an Option" and book_id == "Choose an Option" and title != x):
        print(5)
        q = db.query(booksdb).filter(booksdb.title == title).all()

    elif(title == "Choose an Option" and author == "Choose an Option" and book_id != x):
        print(6)
        q = db.query(booksdb).filter(booksdb.isbn == book_id).all()
    return q


@app.route("/")
@app.route("/home")
def theReaderHome():
    return render_template("polutexHome.html", message= "work")


@app.route("/SignUp")
def signUp():
    """Sign Up."""
    return render_template("signUp.html")

@app.route("/User", methods=["POST"])
def newPolutexUser():
    """Sign Up."""


    user_id = request.form['username']
    name = request.form['Name']
    password = request.form['password']

    print(user_id)

    Age = request.form['Age']
    Gender = request.form['Gender']
    Nationality = request.form['password']
    Phone_Number = request.form['Phone Number']
    Emergency_Contact_Number = request.form['Emergency Contact Number']
    Email = request.form['Email']
    
    sickness1 = request.form.getlist('sickness1')
    db.add(userDB(Username=user_id, Password=password, Name=name, Age=Age, Gender=Gender, Nationality=Nationality, Phone_number=Phone_Number, Emergency_contact_number=Emergency_Contact_Number, Email=Email))
    db.commit()
    return render_template("polutexHome.html")

    # InfecCount = 0
    # infectionList = []
    # sickness1 = request.form.getlist('sickness1')
    # if( str(sickness1) == "Allergies to dust"):
    #     sickness1 = str(sickness1)
    #     infectionList.append(sickness1)
    #     InfecCount += 1
    #     # sickness1 = "-"
    #     # NoCount += 1
    #
    # sickness2 = request.form.getlist('sickness2')
    # if( str(sickness2) == "Asthma"):
    #     sickness2 = str(sickness2)
    #     infectionList.append(sickness2)
    #     InfecCount += 1
    #     # sickness2 = "-"
    #     # NoCount += 1
    #
    # sickness3 = request.form.getlist('sickness3')
    # if( str(sickness3) == "Bronchitis"):
    #     sickness3 = str(sickness3)
    #     infectionList.append(sickness3)
    #     InfecCount += 1
    #     # sickness3 = "-"
    #     # NoCount += 1
    #
    # sickness4 = request.form.getlist('sickness4')
    # if( str(sickness4) == "Lung cancer"):
    #     sickness4 = str(sickness4)
    #     infectionList.append(sickness4)
    #     InfecCount += 1
    #     # sickness4 = "-"
    #     # NoCount += 1
    #
    # sickness5 = request.form.getlist('sickness5')
    # if( str(sickness5) == "Lung collapse"):
    #     sickness5 = str(sickness5)
    #     infectionList.append(sickness5)
    #     InfecCount += 1
    #
    #     # sickness5 = "-"
    #     # NoCount += 1
    #
    # sickness6 = request.form.getlist('sickness6')
    # if( str(sickness6) == "respiratory Inflammation"):
    #     sickness6 = str(sickness6)
    #     infectionList.append(sickness6)
    #     InfecCount += 1
    #     # sickness6 = "-"
    #     # NoCount += 1
    #
    # sickness7 = request.form.getlist('sickness7')
    # if( str(sickness7) == "Pneumonia"):
    #     sickness7 = str(sickness7)
    #     infectionList.append(sickness7)
    #     InfecCount += 1
    #     # sickness7 = "-"
    #     # NoCount += 1
    #
    # # if(len(infectionList) == 0):
    # if(InfecCount == 0):
    #     db.add(userDB(Username=user_id, Password=password, Name=name, Age=Age, Gender=Gender, Nationality=Nationality, Phone_number=Phone_Number, Emergency_contact_number=Emergency_Contact_Number, Email=Email))
    #     db.commit()
    #     return render_template("polutexHome.html")
    # else:
    #     infecStr = ""
    #     for infec in infectionList:
    #         infecStr += ", "+infec
    #     db.add(userDB(Username=user_id, Password=password, Name=name, Age=Age, Gender=Gender, Nationality=Nationality, Phone_number=Phone_Number, Emergency_contact_number=Emergency_Contact_Number, Email=Email, Health_condition=infecStr))
    #     db.commit()
    #     return render_template("polutexHome.html")
        # Health_conditionT = str(str(sickness1)+" "+str(sickness2)+" "+str(sickness3)+" "+str(sickness4)+" "+str(sickness5)+" "+str(sickness6)+" "+str(sickness7))


    # user_id = request.form['user ID']
    # name = request.form['Name']
    # password = request.form['password']

    # add_user(Username=user_id, Password=password, Name=name, Age=Age, Gender=Gender, Nationality=Nationality, Phone_number=Phone_Number, Emergency_contact_number=Emergency_Contact_Number, Email=Email)
    # add_user(Username=user_id, Password=password, Name=name, Age=Age, Gender=Gender, Nationality=Nationality, Phone_number=Phone_Number, Emergency_contact_number=Emergency_Contact_Number, Email=Email, Health_condition=Health_condition)
    db.add(userDB(Username=user_id, Password=password, Name=name, Age=Age, Gender=Gender, Nationality=Nationality, Phone_number=Phone_Number, Emergency_contact_number=Emergency_Contact_Number, Email=Email, Health_condition=Health_conditionT))
    db.commit()
    return render_template("polutexHome.html")



@app.route("/loginAttempt/", methods=["POST"])
def loginAttempt():
    """Sign Up."""
    user_id = request.form['username']
    # name = request.form['Name']
    password = request.form['password']
    # return render_template("loggedIn.html", name = user_id)
    sf =  loginCheck(userName = user_id, password = password)
    if(sf[0]):
        # temp = db.query(readerdb).get(user_id)
        # name = temp.name
        # allBooks =db.query(booksdb).all()
        uName = db.query(userDB).get(user_id)
        usernameT = uName.Username
        passwordT = uName.Password
        nameT = uName.Name
        ageT = uName.Age
        ganderT = uName.Gender
        nationalityT = uName.Nationality
        phone_NumberT = uName.Phone_number
        emergency_Contact_NumberT = uName.Emergency_contact_number
        emailT = uName.Email
        health_conditionT = uName.Health_condition


        return render_template("loggedIn.html",user_id = user_id, name = uName, usernameT=usernameT, passwordT=passwordT, nameT=nameT, ageT=ageT, ganderT=ganderT, nationalityT=nationalityT, phone_NumberT=phone_NumberT, emergency_Contact_NumberT=emergency_Contact_NumberT, emailT=emailT, health_conditionT=health_conditionT)
    elif(sf[1] == 1):
        return render_template("polutexHome.html", wrong = "Invalid UserName")
    elif(sf[1] == 2):
        return render_template("polutexHome.html", wrong = "Invalid Password")


@app.route("/search", methods=["POST"])
def searchBook():
    """Searching ."""
    book_id = request.form.get('bookID')
    title = request.form.get('title')
    author = request.form.get('Author')
    allBooks =db.query(booksdb).all()
    searchResultList = searchOutput(book_id, title, author)
    return render_template("loggedIn.html", searchResultList = searchResultList, allBooks = allBooks)

if __name__ == '__main__':
	app.run(debug=True, port=7000)

# userName = "asok001"
# a = db.query(userDB).get(userName)
# print(a.Age)

# user_id = "asok001"
# uName = db.query(userDB).get(user_id)
# nameT = uName.Name
# print(nameT)
