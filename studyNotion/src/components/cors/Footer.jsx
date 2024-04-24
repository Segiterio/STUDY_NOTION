import React from "react";
import { FooterLink2, FooterLink1 } from "../../data/footer-links";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai"
import {
    AiFillFacebook, AiFillGoogleCircle, AiFillYoutube,
    AiFillTwitterCircle
} from "react-icons/ai"
const Footer = () => {

    return (<div className="bg-richblack-800 text-richblack-400">
        <div className="w-11/12 mx-auto max-w-maxContent py-10 flex flex-col">
            {/* right  */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="grid lg:grid-cols-3 p-5 gap-5 grid-cols-2 place-content-start ">

                    {
                        FooterLink1.map((value, index) => (
                            <div className={`flex flex-col gap-4 ${index == 3 ? " lg:col-span-2 " : ""} `} key={index}>
                                {index == 0 && <Link to="/ " className="w-56 relative right-8"><img src={logo} alt="Logo" 
                                 loading='lazy'/></Link>}
                                <h2 className="text-richblack-100 font-bold">{value.heading}</h2>
                                <div className="flex flex-col gap-3">
                                    {
                                        value.links.map((link, index) =>
                                        (
                                            <a className={`hover:underline text-[14px] w-fit cursor-pointer`} key={index} >{link}</a>
                                        ))
                                    }
                                </div>
                                {index == 0 && <div className=" flex gap-2 self-start">
                                    <AiFillFacebook />
                                    <AiFillGoogleCircle />
                                    <AiFillYoutube />
                                    <AiFillTwitterCircle />
                                </div>}
                            </div>
                        ))
                    }



                </div>
                {/* left  */}
                <div className="flex justify-between sm:border-l p-5 flex-wrap gap-8">
                    {
                        FooterLink2.map((item, index) => {
                            return (<div key={index} className="flex flex-col gap-4">

                                <h2 className="text-richblack-100 font-bold">{item.title}</h2>
                                <div className="flex flex-col gap-3">
                                    {
                                        item.links.map(({ link, title }, index) => {
                                            return (<a href={link} key={index} className="hover:underline text-[14px]  ">
                                                {title}
                                            </a>)
                                        })
                                    }
                                </div>

                            </div>)
                        })
                    }
                </div>
            </div>
            {/* privacy */}
            <div className="flex flex-col items-center sm:flex-row sm:justify-between  border-t mt-2 text-[14px]">

                <div className="flex gap-4 p-2">
                    <div className="border-r pr-2">Privacy Policy</div>
                    <div className="border-r pr-2">Cookie Policy</div>
                    <div>Terms</div>
                </div>


                <div className="p-2 flex items-center gap-2">
                    Made with <AiFillHeart color="red" /> Akash © 2023 Studynotion
                </div>

            </div>
        </div>



    </div>)

}
export default Footer; 