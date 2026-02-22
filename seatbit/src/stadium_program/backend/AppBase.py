import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)


seats = {
    "A": [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]],
    "B": [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]],
    "C": [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]],
    "D": [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15]]
}
def findShortestPath(seatNum):

    num = 0

    if seatNum[1] == 0:
        num = int(seatNum[2])
    else:
        num = int(seatNum[1:])
    il,ir,jl,jr = 0,0,0,0
    lstr = ""
    rstr = ""
    seatPathl = []
    seatPathr = []
    if seatNum[0] == "A":
        jl = 0
        jr = 4
        if num < 11 and num > 5:
            il = 1
            ir = 1
        elif num <= 5:
            il = 0
            ir = 0
        else:
            il = 2
            ir = 2
        while(jl < 5 and seats["A"][il][jl] != num):
            lstr = "A" + str(seats["A"][il][jl])
            seatPathl.append(lstr)
            jl+=1
        while(jr > 0 and seats["A"][ir][jr] != num):
            rstr = "A" + str(seats["A"][ir][jr])
            seatPathr.append(rstr)
            jr-=1
        if(jl == 0 and seats["A"][il][jl] == num):
            lstr = "A" + str(seats["A"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con1")
            return seatPathl
        elif(jr == 4 and seats["A"][ir][jr] == num):
            rstr = "A" + str(seats["A"][ir][jr])
            seatPathr.append(rstr)
            seatPathr.append("Con2")
            return seatPathr
        elif(len(seatPathl) < len(seatPathr)):
            lstr = "A" + str(seats["A"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con1")
            return seatPathl
        elif(len(seatPathl) > len(seatPathr)):
            rstr = "A" + str(seats["A"][ir][jr])
            seatPathr.append(rstr)
            seatPathr.append("Con2")
            return seatPathr
        else:
            lstr = "A" + str(seats["A"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con1")
            return seatPathl
    elif seatNum[0] == "B":
        jl = 0
        jr = 4
        if num < 11 and num > 5:
            il = 1
            ir = 1
        elif num <= 5:
            il = 0
            ir = 0
        else:
            il = 2
            ir = 2
        while(jl < 5 and seats["B"][il][jl] != num):
            lstr = "B" + str(seats["B"][il][jl])
            seatPathl.append(lstr)
            jl+=1
        while(jr > 0 and seats["B"][ir][jr] != num):
            rstr = "B" + str(seats["B"][ir][jr])
            seatPathr.append(rstr)
            jr-=1
        if(jl == 0 and seats["B"][il][jl] == num):
            lstr = "B" + str(seats["B"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con2")
            return seatPathl
        elif(jr == 4 and seats["B"][ir][jr] == num):
            rstr = "B" + str(seats["B"][ir][jr])
            seatPathr.append(rstr)
            seatPathr.append("Con3")
            return seatPathr
        elif(len(seatPathl) < len(seatPathr)):
            lstr = "B" + str(seats["B"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con2")
            return seatPathl
        elif(len(seatPathl) > len(seatPathr)):
            rstr = "B" + str(seats["B"][ir][jr])
            seatPathr.append(rstr)
            seatPathr.append("Con3")
            return seatPathr
        else:
            print("length l: ", len(seatPathl))
            print("length r:", len(seatPathr))
            lstr = "B" + str(seats["B"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con2")
            return seatPathl
    elif seatNum[0] == "C":
        jl = 0
        jr = 4
        if num < 11 and num > 5:
            il = 1
            ir = 1
        elif num <= 5:
            il = 0
            ir = 0
        else:
            il = 2
            ir = 2
        while(jl < 5 and seats["C"][il][jl] != num):
            lstr = "C" + str(seats["C"][il][jl])
            seatPathl.append(lstr)
            jl+=1
        while(jr > 0 and seats["C"][ir][jr] != num):
            rstr = "C" + str(seats["C"][ir][jr])
            seatPathr.append(rstr)
            jr-=1
        if(jl == 0 and seats["C"][il][jl] == num):
            lstr = "C" + str(seats["C"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con4")
            return seatPathl
        elif(jr == 4 and seats["C"][ir][jr] == num):
            rstr = "C" + str(seats["C"][ir][jr])
            seatPathr.append(rstr)
            seatPathr.append("Con3")
            return seatPathr
        elif(len(seatPathl) < len(seatPathr)):
            lstr = "C" + str(seats["C"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con4")
            return seatPathl
        elif(len(seatPathl) > len(seatPathr)):
            rstr = "C" + str(seats["C"][ir][jr])
            seatPathr.append(rstr)
            seatPathr.append("Con3")
            return seatPathr
        else:
            lstr = "C" + str(seats["C"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con4")
            return seatPathl
    else:
        jl = 0
        jr = 4
        if num < 11 and num > 5:
            il = 1
            ir = 1
        elif int(seatNum[1]) <= 5:
            il = 0
            ir = 0
        else:
            il = 2
            ir = 2
        while(jl < 5 and seats["D"][il][jl] != num):
            lstr = "D" + str(seats["D"][il][jl])
            seatPathl.append(lstr)
            jl+=1
        while(jr > 0 and seats["D"][ir][jr] != num):
            rstr = "D" + str(seats["D"][ir][jr])
            seatPathr.append(rstr)
            jr-=1
        if(jl == 0 and seats["D"][il][jl] == num):
            lstr = "D" + str(seats["D"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con1")
            return seatPathl
        elif(jr == 4 and seats["D"][ir][jr] == num):
            rstr = "D" + str(seats["D"][ir][jr])
            seatPathr.append(rstr)
            seatPathr.append("Con4")
            return seatPathr
        elif(len(seatPathl) < len(seatPathr)):
            lstr = "D" + str(seats["D"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con1")
            return seatPathl
        elif(len(seatPathl) > len(seatPathr)):
            rstr = "D" + str(seats["D"][ir][jr])
            seatPathl.append(rstr)
            seatPathr.append("Con4")
            return seatPathr
        else:
            lstr = "D" + str(seats["D"][il][jl])
            seatPathl.append(lstr)
            seatPathl.append("Con1")
            return seatPathl

def checkValid(seatNum):
    charList = ["A","B","C","D"]
    seatPath = []
    num = 0
    if len(seatNum) != 3:
        print("That seat not in the database, please enter a valid seat number.")
        return None
    if type(seatNum) is str:
        seatList = list(seatNum)
        if(seatNum[0].isalpha() and seatNum[1].isdigit() and seatNum[2].isdigit() and num < 16):
            if seatNum[1] == 0:
                num = int(seatNum[2])
            else:
                num = int(seatNum[1:])
                if seatNum[0] in seatList:
                    seatPath = findShortestPath(seatNum)
                    return seatPath
                else:
                    print("Seat not in the database, please enter a valid seat number.")
                    return None
        else:
            print("That seat not in the database, please enter a valid seat number.")
            return None
    else:
        print("That seat not in the database, please enter a valid seat number.")
        return None

def main():
    seatNum = input("Enter your seat number: ")
    seatPath = checkValid(seatNum)
    if(seatPath == None):
        while seatPath == None:
            seatNum = input("Enter your seat number: ")
            seatPath = checkValid(seatNum)
    print(seatPath)  

@app.route("/get_path", methods=["POST"])
def get_path():
    """
    Receive {"seat": "A03"} and return path to nearest concession
    """
    data = request.get_json()
    seat_id = data.get("seat")
    if not seat_id:
        return jsonify({"status": "failed", "message": "No seat provided"}), 400

    path = checkValid(seat_id)
    if path is None:
        return jsonify({"status": "failed", "message": "Invalid seat number"}), 400

    return jsonify({"status": "success", "seat": seat_id, "path": path})

if __name__ == "__main__":
    app.run(debug=True)