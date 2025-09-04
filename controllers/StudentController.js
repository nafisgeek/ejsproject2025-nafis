const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;
async function addstudent(req, res) {
    let result;
    try {
        // console.log(req.body, 'req.body');
        // console.log(req.file, "req.file..")
        if (req.file) {
            cloudinary.config({
                cloud_name: 'dpmqnvcfd',
                api_key: '445655777314761',
                api_secret: 'onTHMWY59Vn3faaeVFlzv4Qpw_U'
            });
             result = await cloudinary.uploader.upload(req.file.path);
            // console.log(result);
        }
        let student = new Student(req.body);
        if (req.file) {
            student.studentImage = result.secure_url;
        }
        await student.save();
        // console.log("Data updated...............")

        let students = await Student.find({});
        // console.log("Student added successfully.....");

        res.render('studentlist', {
            students: students
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error adding student");
    }
}

async function deletestudent(req, res) {
    try {
        const studentId = req.params._id;
        // console.log(studentId, 'Deleted Student')
        await Student.deleteOne({ _id: studentId });
        let students = await Student.find({});
        res.render('welcomeadmin', {
            students: students
        })
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}


async function openEditPage(req, res) {
    try {
        let studentId = req.params._id
        // console.log(studentId);
        let student = await Student.findOne({ _id: studentId })
        if (student) {
            res.render('studenteditpage', {
                student: student
            })
        } else {
            res.render('/');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error")
    }
}

async function editstudent(req, res) {
    try {
        const studentId = req.params._id;
        // console.log(studentId, 'StudentID');
        let student = await Student.findOne({ _id: studentId });
        if (student) {
            // console.log(req.body, 'req.body');
            student.rollNo = req.body.rollNo
            student.studentName = req.body.studentName
            student.fatherName = req.body.fatherName
            student.motherName = req.body.motherName
            student.course = req.body.course
            student.branch = req.body.branch
            student.yearofAdmisson = req.body.yearofAdmisson
            await student.save();
            let students = await Student.find({});
            res.render('welcomeadmin', {
                students: students
            })
        } else {
            res.end("Student Not FOund...")
        }
    } catch (err) {
        console.log(err)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    addstudent,
    deletestudent,
    openEditPage,
    editstudent
}