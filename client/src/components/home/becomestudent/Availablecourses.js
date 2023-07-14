

import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "../../../assets/back.jpg";
import { useNavigate } from "react-router-dom";
import '../../searchresult.css'
import { deepOrange } from "@mui/material/colors";
const Availablecourses = () => {
  const [courseData, setCourseData] = useState([]);
  const navigate=useNavigate()
  console.log("course data is", courseData);
  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/showallcourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.log(error);
    }
  };
 const myclick=(data)=>{    //error occur due to this functionS
    navigate(`/showcoursebyidforstudent/${data._id}`)
    console.log('data from inside',data)
 }
 
  return (
    <>
      <div className="yt_header">
        <h1>
          excess <span>Premium</span> learning and grow
        </h1>
        <p>Click on the course to access and explore!</p>
      </div>

      <div className="yt_videos">

        {courseData.map((data) => (

          <div className="coursein_video" key={data?._id} onClick={()=>myclick(data)}>
             
            <div className="yt_img">
              <img src={data?.picture} alt="course_img" />
            </div>
            <div className="yt_nameandlogo">
              <Avatar alt={data?.addedBy} sx={{ bgcolor: deepOrange[500] }} style={{textTransform:"capitalize"}} src="http://graph.facebook.com/{user-id}/picture?type=large"/>
              <div>
                {data?.title

}

              </div>
            </div>
            <div className="yt_description">
              <p>{data?.description?.slice(0, 50)}...</p>
              <p className="yt_hour">Author: {data?.addedBy}</p>
              <h3 className="yt_mainprice">CAD ${data?.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Availablecourses;






// import { Avatar } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Image from "../../../assets/back.jpg";
// import { useNavigate } from "react-router-dom";
// import "../../searchresult.css";

// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { deepOrange } from "@mui/material/colors";
// const stripePromise = loadStripe('pk_test_51NT9nND0FISafXCStjimCrV8Xzuvw5zshen0R69KmnOSubnKIZU0a2H2LcIkVkLNaA0Ah84HMq1YizJu5zNWOtmd002e2ti6q6');
// const Availablecourses = () => {
//   const [courseData, setCourseData] = useState([]);
//   const navigate=useNavigate()
//   console.log("course data is", courseData);
// //   const stripePromise = loadStripe('pk_test_51NT9nND0FISafXCStjimCrV8Xzuvw5zshen0R69KmnOSubnKIZU0a2H2LcIkVkLNaA0Ah84HMq1YizJu5zNWOtmd002e2ti6q6');
//   useEffect(() => {
//     fetchCourseData();
//   }, []);

//   const fetchCourseData = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/showallcourses`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await response.json();
//       setCourseData(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  
//   const elements = useElements();
//   const handlePayment = async (course) => {
//     const stripe = await stripePromise;

//     if (!stripe || !elements) {
//       return;
//     }

//     try {
//       // Create a payment intent on your server and get the client secret
//       const response = await fetch('/create-payment-intent', {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           courseId: course._id,
//           amount: course.price * 100, // Stripe requires the amount in cents
//         }),
//       });
//       const { clientSecret } = await response.json();

//       // Redirect to the payment page with courseId as a URL parameter
//       navigate(`/payment?courseId=${course._id}`);

//       // Use the client secret and CardElement to confirm the payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         console.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           // Payment success
//           navigate("/payment-success");
//         }
//       }
//     } catch (error) {
//       console.error(error);     
//     }
//   };




  

//   return (
//     <>
//       <div className="yt_header">
//         <h1>
//           excess <span>Premium</span> learning and grow
//         </h1>
//         <p>Click on the course to access and explore!</p>
//       </div>

//       <div className="yt_videos">
//         {courseData.map((data) => (
//           <div className="coursein_video" key={data?._id}  onClick={() => handlePayment(data)}>
//             {console.log(data)}
//             <div className="yt_img">
//               <img src={data?.picture} alt="course_img" />
//             </div>
//             <div className="yt_nameandlogo">
//               <Avatar
//                 alt={data?.addedBy}
//                 sx={{ bgcolor: deepOrange[500] }}
//                 style={{ textTransform: "capitalize" }}
//                 src="http://graph.facebook.com/{user-id}/picture?type=large"
//               />
//               <div>{data?.title}</div>
//             </div>
//             <div className="yt_description">
//               <p>{data?.description?.slice(0, 50)}...</p>
//               <p className="yt_hour">Author: {data?.addedBy}</p>
//               <h3 className="yt_mainprice">CAD ${data?.price}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Availablecourses;
