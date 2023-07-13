import React from 'react'
import * as Icons from "react-icons/vsc"
import { Link, useLocation } from 'react-router-dom'

const SideBarLink = ({ link }) => {
    const Icon = Icons[link.icon];
    const location = useLocation();
    return (
        <div className={ `text-sm px-3 py-2 border-l-4 ${link.path == location.pathname ? "text-yellow-100 bg-yellow-800 border-yellow-50" :" text-richblack-300 border-transparent " }  ` } >
            {  
                <Link to={link.path} className='flex items-center gap-1'>
                  <Icon />  {link.name}
                </Link>
            }
        </div>
    )
}
export default SideBarLink