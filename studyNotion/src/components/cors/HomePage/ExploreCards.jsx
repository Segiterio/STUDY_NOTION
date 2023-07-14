import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";


export default function ExploreCards() {
    const tags = ["Free", "New to coding", "Skills paths", "Most popular", "Career paths"];

    const [card, setCard] = useState(0)
    const cards = HomePageExplore[card].courses;
    const [subCard, setSubCard] = useState(0);

    return (<div className="flex flex-col font-inter relative top-16 max-w-maxContent">

        <div className="flex flex-col items-center md:flex-row border border-richblack-600 gap-1 sm:gap-2 md:gap-5 text-xs lg:text-base rounded-md md:rounded-full p-1 self-center text-richblack-50">
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

        <div className="grid gap-3 lg:grid-cols-3 place-items-center py-10">

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

                    return (<div key={index} className={"flex flex-col justify-between gap-10 sm:w-2/3 lg:w-full duration-300 cursor-pointer " + shadow + bg} onClick={() => {
                        setSubCard(index);
                    }}>

                        <div className="p-4">
                            <p className={"text-base sm:text-lg font-bold mb-2 " + headingText}>{item.heading}</p>
                            <p className={textD + " text-sm"}>{item.description}</p>
                        </div>
                        <div className={"flex justify-between border-t border-dashed p-4 " + textF}>
                            <div className="flex items-center gap-2 text-sm"><HiUsers /> {item.level}</div>
                            <div className="flex items-center gap-2 text-sm" ><ImTree size={".8rem"} /> {item.lessionNumber} Lesson</div>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>)


}
