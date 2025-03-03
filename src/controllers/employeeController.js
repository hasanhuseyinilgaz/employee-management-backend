import Employee from "../models/Employee.js";

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (err) {
        console.error("Error Detail:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("Incoming ID:", id);

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found!" });
        }

        res.json(employee);
    } catch (err) {
        console.error("Error Detail:", err);
        res.status(500).json({ error: err.message });
    }
};


export const addEmployee = async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        const { first_name, last_name, birth_date, is_active, profile_picture } = req.body;

        if (!first_name || !last_name || !birth_date) {
            return res.status(400).json({ error: "There are missing parameters!" });
        }

        const newEmployee = await Employee.create({
            first_name,
            last_name,
            birth_date,
            is_active: is_active ?? true,
            profile_picture
        });

        res.status(201).json(newEmployee);
    } catch (err) {
        console.error("Error Detail:", err);
        res.status(500).json({ error: err.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, birth_date, is_active, profile_picture } = req.body;

        console.log("ID to be updated:", id);

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found!" });
        }

        await Employee.update(
            {
                first_name,
                last_name,
                birth_date,
                is_active,
                profile_picture,
                updated_at: new Date()
            },
            { where: { id } }
        );

        const updatedEmployee = await Employee.findByPk(id);

        res.json(updatedEmployee);
    } catch (err) {
        console.error("Error Detail", err);
        res.status(500).json({ error: err.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("ID to be deleted:", id);

        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: "Employee not found!" });
        }

        await employee.destroy();

        res.json({ message: "Employee deleted successfully!" });
    } catch (err) {
        console.error("Error Detail:", err);
        res.status(500).json({ error: err.message });
    }
};

export const updateEmployeePhoto = async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Incoming ID:", id);
        console.log("Incoming Body:", req.body);
        console.log("Incoming File:", req.file);

        const employee = await Employee.findByPk(id);

        if (!employee) {
            console.log("Employee not found!");
            return res.status(404).json({ error: "Employee not found!" });
        }

        if (!req.file) {
            console.log("File not uploaded!");
            return res.status(400).json({ error: "Please a upload image!" });
        }

        console.log("Uploaded File:", req.file.filename);

        employee.profile_picture = req.file.filename;
        await employee.save(); 

        console.log("Image uploaded successfully!");

        res.json({ message: "Image uploaded successfully!", file: req.file.filename });

    } catch (error) {
        console.error("Error Detail:", error);
        res.status(500).json({ error: "A error found:", details: error.message });
    }
};



  