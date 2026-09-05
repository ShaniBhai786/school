import { useFormikContext } from "formik";
import { useEffect } from "react";

export default function StudentFetcher() {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {

        const id = values.studentId || "";

        if (id.length < 4) return;

        const fetchData = async () => {

            try {
                // 1️⃣ GET STUDENT INFO ONLY
                const studentRes = await fetch(`/api/students/${id}`);
                const studentData = await studentRes.json();

                if (studentData.success) {
                    const student = studentData.student;

                    setFieldValue("name", student.fullName || "");
                    setFieldValue("class", student.class || "");
                    setFieldValue("fee", student.fee || "");
                }

                // 2️⃣ GET LATEST FEE RECORD
                const feeRes = await fetch(`/api/fees/${id}`);
                const feeData = await feeRes.json();

                if (feeData.success && feeData.fee) {
                    const latest = feeData.fee;

                    setFieldValue("fee", latest.fee || 0);
                    setFieldValue("pending", latest.pending || 0);
                    setFieldValue("balance", latest.balance || 0);
                    setFieldValue("testfee", latest.testfee || 0);
                    setFieldValue("others", latest.others || 0);
                    
                }
                console.log("Fee Data:", feeData);

            } catch (error) {
                console.log("Fetch error:", error);
            }
        };

        fetchData();

    }, [values.studentId]);

    return null;
}

