import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";


export default function ExploreCards() {
    const tags = ["Free", "New to coding", "Skills paths", "Most popular", "Career paths"];

    const [card, setCard] = useState(0)
    const cards = HomePageExplore[card].courses;
    const [subCard, setSubCard] = useState(0);

    return (<div className="flex flex-col font-inter relative top-16 max-w-maxContent ">

        <div className="flex border gap-5 rounded-full p-1 self-center">
            {tags.map((tag, index) => {
                let clickedStyle = "";
                if (card === index) {
                    clickedStyle = "bg-richblack-700";
                }
                else {
                    clickedStyle = "hover:bg-richblack-800 duration-200 ";
                }
                return <div key={index} className={"px-3 py-1 cursor-pointer select-none rounded-full " + clickedStyle} onClick={() => {
                    setCard(index);
                    setSubCard(0);
                }}>
                    {tag}
                </div>
            })}
        </div>

        <div className="flex flex-col items-center mt-10 gap-5 sm:flex-row">

            {
                cards.map((item, index) => {
                    let headingText = "", shadow = "", bg = "", textD = "", textF = "";
                    if (index === subCard) {
                        headingText = "text-richblack-800";
                        shadow = "shadow-[10px_10px]  shadow-yellow-100 ";
                        bg = "bg-white";
                        textD = "text-richblack-500";
                        textF = "text-blue-300";
                    }
                    else {
                        headingText = "text-richblack-25";
                        bg = "bg-richblack-800 ";
                        textD = "text-richblack-400";
                        textF = textD;
                    }

                    return (<div key={index} className={"flex flex-col w-80  justify-between gap-10 duration-300 cursor-pointer " + shadow + bg} onClick={() => {
                        setSubCard(index);
                    }}>

                        <div className="p-4">
                            <p className={" text-xl font-bold mb-2 " + headingText}>{item.heading}</p>
                            <p className={textD}>{item.description}</p>
                        </div>
                        <div className={"flex justify-between border-t border-dashed p-4 " + textF}>
                            <div className="flex items-center gap-2"><HiUsers /> {item.level}</div>
                            <div className="flex items-center gap-2 " ><ImTree size={".8rem"} /> {item.lessionNumber} Lesson</div>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>)


}
