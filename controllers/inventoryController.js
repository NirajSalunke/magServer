import treatment from "../models/treatementModel.js";
import patient from "../models/patientModel.js";
export const getReadmission = async (req, res) => {
	try {
		const response = await treatment.find({ status: "readmission" });
		if (response) {
			const data = response.map((ele) => {
				return { ...ele, days: (ele.endAt - ele.startAt) / (1000 * 60 * 60 * 24) };
			});
			return res.status(200).json({
				success: true,
				data: data
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
export const getTreatment = async (req, res) => {
	try {
		console.log("hi");
		const email = req.query.email;
		if (!email) {
			return res.status(400).json({
				success: false,
				message: "Email required",
			});
		}
		const response = await treatment.findOne({ email, status: "readmission" });
		const res2 = await patient.findOne({ email });
		console.log(response);
		console.log(res2);
		if (response && res2) {
			return res.status(200).json({
				success: true,
				name: res2.name,
				email: res2.email,
				age: res2.age,
				gender: res2.gender,
				weight: res2.weight,
				disease: response.disease,
				doctor: response.doctor,
				assisted: response.assistant,
				days: (response.endAt - response.startAt) / (1000 * 60 * 60 * 24),
				resources: response.resources,
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

export const getCumulativeResources = async (req, res) => {
    try {
        const allTreatments = await treatment.find({});

        if (!allTreatments || allTreatments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No treatment data found",
            });
        }

        const cumulativeResources = {};

        allTreatments.forEach((treatment) => {
            if (treatment.resources) {
                for (const [key, value] of Object.entries(treatment.resources)) {
                    cumulativeResources[key] = (cumulativeResources[key] || 0) + value;
                }
            }
        });

        return res.status(200).json({
            success: true,
            data: cumulativeResources,
        });
    } catch (error) {
        console.error("Error fetching cumulative resources:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}