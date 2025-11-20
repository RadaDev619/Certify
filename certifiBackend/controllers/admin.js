const Admin = require('../model/admin')
const Institute = require('../model/institute')

export const createAdmin = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const admin = await Admin.create({ name, email, password })
        if (!admin) {
            res.status(500).json({ status: "failed", message: "Creation failed" })
        }
        res.status(200).json({ status: "success", data: admin })
    } catch (error) {
        res.status(500).json({ status: "failed", error: error })
    }
}

export const adminLogin = async (req, res) => {
    try {
        const user = await Admin.findByCredentials(req.body.email, req.body.password);
        if (user) {
            res.status(200).json({ message: "Credentail Matched", status: "Success", data: user })
        } else {
            res.status(400).json({ message: "Invalid Credential", status: "Failed" })
        }
    } catch (e) {
        res.status(400).send(e)
    }
}

export const getAdmin = async (req, res) => {
    const admin = await Admin.findById("6656fed4aa7d551a7e8ebf51")

    res.status(200).json({ status: "success", data: admin })
}

export const registerInstitute = async (req, res) => {
    const { companyName, email, instituteType, instituteLocation, password } = req.body;
    if (!companyName) return res.status(400).send("Name is required");

    //password length validation for debugging
    if (!password || password.length < 6)
        return res.status(400).send("Password should be a minimum of 6 characters");

    try {
        const instituteExist = await Institute.findOne({ email });
        if (instituteExist) return res.status(400).json({ error: "Email is taken" });

        // Create a new user instance
        const newInstitute = await Institute.create({ companyName, email, instituteType, instituteLocation, password, verified: true });
        if (!newInstitute) {
            return res.status(400).json({ status: "Failed", message: "Institute not created" })
        }

        res.status(201).json({ status: "success", data: newInstitute });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: "failed",
            message: error.message
        })
    }
};

export const getAllInstitutes = async (req, res) => {
    // console.log("Fetching all institutes");

    try {
        // Retrieve all institutes
        const institutes = await Institute.find({});

        // Format the result to the specified structure
        const formattedInstitutes = institutes.map(institute => ({
            email: institute.email,
            companyName: institute.companyName,
            instituteLocation: institute.instituteLocation,
            instituteType: institute.instituteType,
            password: institute.password
        }));

        // console.log("Formatted Institutes:", formattedInstitutes);

        res.status(200).json({  status: 'success', data: formattedInstitutes });
    } catch (err) {
        console.error("Error fetching institutes:", err);
        return res.status(500).send("Server error");
    }
};