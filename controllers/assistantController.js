import treatment from "../models/treatementModel.js";
import patient from "../models/patientModel.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const flask_origin = process.env.FLASK_URL;
export const sendPatientData = async (req, res) => {
  try {
    const { patientData, treatmentData } = req.body;
    console.log(patientData);
    console.log(treatmentData);
    if (!patientData || !treatmentData) {
      return res.status(400).json({
        success: false,
        message: "Data and treatment required",
      });
    }
    const res1 = await patient.findOne({ email: patientData.email });
    if (res1) {
      return res.status(400).json({
        success: false,
        message: "Patient already exists",
      });
    }
    const resposnse = await patient.create(patientData);
    const treatmentResponse = await treatment.create(treatmentData);
    if (resposnse && treatmentResponse) {
      return res.status(200).json({
        success: true,
        message: "Data sent successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateTreatement = async (req, res,next) => {
  console.log("updating")
  const { email, updateData } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email is required",
    });
  }
  if (!updateData) {
    return res.status(400).json({
      success: false,
      message: "Update data required",
    });
  }

  const response = await treatment.findOne({ email, status: "admitted" });
  if (!response) {
    return res.status(404).json({
      success: false,
      message: "No data found",
    });
  }

  let updateObject = { ...updateData };

  if (updateData.resources) {
    updateObject.resources = { ...response.resources, ...updateData.resources };
  } else {
    delete updateObject.resources;
  }

  try {
    const updatedResponse = await treatment.findOneAndUpdate(
      { email, status: "admitted" },
      { $set: updateObject },
      { new: true }
    );

    if (updatedResponse) {
      next()
      // return res.status(200).json({
      //   success: true,
      //   message: "Data updated successfully",
      // });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const response = await patient.find({});
    if (response && response.length > 0) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getPatient = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }
    const response = await patient.find({ email });
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const createTreatment = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Data required",
      });
    }
    const res = await treatment.find({ email: data.email });
    if (res) {
      res.map((ele) => {
        if (ele.status === "admiited" || ele.status === "readmission") {
          return res.status(400).json({
            success: false,
            message: "Patient is already admitted or readmitted",
          });
        }
      });
    }

    const response = await treatment.create(data);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Data created successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//call ml model to predict readmission
export const predictReadmission = async (req, res) => {
  try {
    console.log("hi");
    const { email } = req.body;
    let data;
    const pat = await patient.findOne({ email });
    const treat = await treatment.findOne({ email, status: "discharged" });
    if (pat && treat) {
      data = {
        num_diagnoses: treat.numofdiagnosis,
        num_procedures: treat.procedures,
        num_external_injuries: treat.numofexternalInjuries,
        length_of_stay: (treat.endAt - treat.startAt) / (1000 * 60 * 60 * 24),
        median_household_income: pat.income,
        age: pat.age,
        diagnoses: treat.disease,
        external_injuries: treat.externalInjuries,
        insurance_type_public: pat.insurance == "public" ? 1 : 0,
        "insurance_type_self-pay": pat.insurance == "self-pay" ? 1 : 0,
        gender_male: pat.gender == "male" ? 1 : 0,
        home_yes: pat.home ? 1 : 0,
        facility_yes: treat.facility ? 1 : 0,
      };
      const response = await axios.post(`${flask_origin}/predict`, data);
      console.log("data,", response.data.readmission_prediction);

      if (response) {
        if (response.data.readmission_prediction == 1) {
          const updatedResponse = await treatment.findOneAndUpdate(
            { email },
            { $set: { status: "readmission" } },
            { new: true }
          );
          return res.status(200).json({
            success: true,
            data: response.data,
          });
        } else {
          return res.status(200).json({
            success: true,
            data: response.data,
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: "No data found",
        });
      }
    }
  } 
  catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getAllPatientOfAssissant = async (req, res) => {
  try {
    const assistant = req.query.assistant;
    if (!assistant) {
      return res.status(400).json({
        success: false,
        message: "Assistant required",
      });
    }
    const response = await treatment.find({ assistant });
    const uniquePatients = new Set();

    for (const entry of response) {
      const { email } = entry;
      if (!email) continue;

      const patientData = await patient.findOne({ email });
      if (patientData) {
        uniquePatients.add(patientData);
      }
    }

    const uniquePatientsArray = Array.from(uniquePatients);
    console.log(uniquePatientsArray);
    if (response) {
      return res.status(200).json({
        success: true,
        data: uniquePatientsArray,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
