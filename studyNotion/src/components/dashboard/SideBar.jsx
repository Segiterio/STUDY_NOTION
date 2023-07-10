import React from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import SideBarLink from './SideBarLink'
import { useSelector , useDispatch} from 'react-redux'
import { VscSignOut } from 'react-icons/vsc'
const SideBar = ({setLogModal}) => {
    const user = useSelector(state => state.profile);
    
    return (
        <div className='sticky top-8'>
            {
                sidebarLinks.map((link) => (
                    // !link.type if link.type is undefined return that element
                    (!link.type || link.type == user?.accountType) &&
                    <SideBarLink key={link.id} link={link} />
                )
                )
            }
            <div className=' h-[2px] bg-richblack-700 self-center my-2'></div>
            {/* add setting and logout */}
            <div className='flex flex-col gap-2 '>
            <SideBarLink link={{
            name:"Settings",
            icon:"VscSettingsGear",
            path:"/dashboard/setting"
        }}/>
            {/* log out retry */}
            <div className='cursor-pointer pl-3 text-richblack-300 text-sm border-l-4 border-transparent flex items-center gap-1' onClick={() =>
            {
                 setLogModal(true);
            }}> <VscSignOut />Log out</div>
            </div>

        </div>
    )
}
export default SideBar