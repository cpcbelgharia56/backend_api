const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// Add Student
exports.addStudent = async(req,res)=>{

try{

    const {name,email,contact,password}=req.body;

    const exist=await Student.findOne({email});

    if(exist){
        return res.status(400).json({
            message:"Email already exists"
        });
    }

    const hashPassword=await bcrypt.hash(password,10);

    const student=new Student({

    name,
    email,
    contact,
    password:hashPassword

    });

    await student.save();

    res.status(201).json({

    message:"Student Added Successfully",
    student

    });

    }

    catch(err){

    res.status(500).json({
    error:err.message
    });

}

};

// Get All Students
exports.getAllStudents=async(req,res)=>{

try{

const students=await Student.find().select("-password");

res.json({'students':students, status: true});

}

catch(err){

res.status(500).json({
error:err.message,status: false
});

}

};

// Get Student By Id
exports.getStudentById=async(req,res)=>{

try{

const student=await Student.findById(req.params.id).select("-password");

if(!student){

return res.status(404).json({
message:"Student Not Found"
});

}

res.json(student);

}

catch(err){

res.status(500).json({
error:err.message
});

}

};

// Update Student
exports.updateStudent=async(req,res)=>{

try{

const {name,email,contact}=req.body;

const student=await Student.findByIdAndUpdate(

req.params.id,

{
name,
email,
contact
},

{
new:true
}

);

res.json({

message:"Student Updated",

student

});

}

catch(err){

res.status(500).json({

error:err.message

});

}

};