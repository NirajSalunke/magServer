import treatment from "../models/treatementModel.js";
import patient from "../models/patientModel.js";
export const getReadmission = async (req,res)=>{
    try {
        const response = await treatment.find({status:"readmission"});
        if(response){
            return res.status(200).json({
                success:true,
                data:response
            })
        }
        else{
            return res.status(404).json({
                success:false,
                message:"No data found"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
export const getTreatment = async (req, res) => {
    try {
      const email = req.query.email;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email required",
        });
      }
      const response = await treatment.findOne({ email,status:"readmission" });
      const res2 = await patient.findOne({ email });
      if (response && res2) {
          return res.status(200).json({
              success: true,
              name: res2.name,
              email: res2.email,
              age: res2.age,
              gender:res2.gender,
              weight:res2.weight,
              disease:response.disease,
              doctor:response.doctor,
              assisted:response.assistant,
              days: (response.endAt - response.startAt) / (1000 * 60 * 60 * 24),
              resources:response.resources,
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