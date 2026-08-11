const express = require("express");

const router = express.Router();

const { 
    addStudent , getAllStudents, updateStudent, getStudentById
} = require("../controllers/studentController");

router.post("/add_student",addStudent);
router.get("/get_all_students",getAllStudents);
router.put("/update_student/:id",updateStudent);
router.get("/get_student/:id",getStudentById);

module.exports = router;